using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Repositories.Interface;
using CoffeeStoreManagementApp.Services.Interfaces;

namespace CoffeeStoreManagementApp.Services
{
    public class CartServices : ICartServices
    {
        private readonly IRepository<int, Coffee> _coffeeRepository;
        private readonly IRepository<int,Cart> _cartRepository;
        private readonly IRepository<int, CartItem> _cartItemRepository;
        private readonly IRepository<int, Order> _orderRepository;
        private readonly IRepository<int, OrderDetail> _orderDetailRepository;
        public CartServices(IRepository<int, Coffee> coffeeRepository, IRepository<int,Cart> cartRepository, IRepository<int, CartItem> cartItemRepository, IRepository<int, OrderDetail> orderDetailRepository, IRepository<int, Order> orderRepository) {
        
            _cartRepository = cartRepository;
            _cartItemRepository = cartItemRepository;
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;
            _coffeeRepository = coffeeRepository;
        }

        public async Task<CartItem> AddItemToCart(AddItemToCartDTO addItemToCartDTO)
        {

            var carts = await _cartRepository.GetAll();

            Cart userCart = carts.FirstOrDefault(c => c.UserId == addItemToCartDTO.UserId);


            if(userCart == null)
            {
                throw new UnauthorizedUserException("User data not found, login required");
            }

            var existingItem = userCart.CartItems.FirstOrDefault(ci => ci.CoffeeId == addItemToCartDTO.CoffeeId && ci.AddOns == addItemToCartDTO.AddOn);

            if(existingItem != null) {

                existingItem.Quantity += 1;
                existingItem.CartItemPrice = existingItem.Quantity * existingItem.PricePerCartItem;
                if (existingItem.Quantity > 2)
                {
                    existingItem.Discount = existingItem.CartItemPrice * 0.1;
                }
                await _cartItemRepository.Update(existingItem);
                return existingItem;
            }
            else
            {
                CartItem newItem = new CartItem
                {
                    CartId = userCart.CartId,
                    CoffeeId = addItemToCartDTO.CoffeeId,
                    AddOns = addItemToCartDTO.AddOn,
                    PricePerCartItem = addItemToCartDTO.Price,
                    CartItemPrice = addItemToCartDTO.Price,
                    Discount = 0,
                    Quantity = 1

                };

                await _cartItemRepository.Add(newItem);
                return newItem;

            }



        }

      

        public async Task<List<CartItem>> GetCartItems(int userId)
        {
            var carts = await _cartRepository.GetAll();

            Cart userCart = carts.FirstOrDefault(c => c.UserId == userId);


            if (userCart == null)
            {
                throw new UnauthorizedUserException("User data not found, login required");
            }

            var cartItems = userCart.CartItems;

            if (cartItems.Count == 0)
            {
                throw new EmptyListException("Cart");
            }

            return cartItems.ToList();

        }


        public async Task<CartItem> UpdateCartItemQuantity(UpdateCartItemDTO updateCartItemDTO)
        {
            var CartItem = await _cartItemRepository.GetByKey(updateCartItemDTO.CartItemId);

            if(CartItem == null)
            {
                throw new ElementNotFoundException("Cart Item");
            }

            CartItem.Quantity = updateCartItemDTO.Quantity;

            if(CartItem.Quantity == 0)
            {
                var deletedCartItem = await DeleteCartItem(CartItem.CartItemId);
                return deletedCartItem;
            }

            CartItem.CartItemPrice = CartItem.PricePerCartItem * CartItem.Quantity;
            if(updateCartItemDTO.Quantity <= 2)
            {
                CartItem.Discount = 0;
            }
            else
            {
                CartItem.Discount = CartItem.CartItemPrice * 0.1;
            }

            await _cartItemRepository.Update(CartItem);

            return CartItem; 

        }

        public async Task<CartItem> DeleteCartItem(int cartItemId)
        {
            var deletedCartItem = await _cartItemRepository.DeleteByKey(cartItemId);
            if (deletedCartItem == null)
            {
                throw new ElementNotFoundException("Cart Item");
            }

            return deletedCartItem;
            
        }

        public async Task<Order> CheckoutCart(int userId)
        {
            var carts = await _cartRepository.GetAll();

            Cart userCart = carts.FirstOrDefault(c => c.UserId == userId);


            if (userCart == null)
            {
                throw new UnauthorizedUserException("User data not found, login required");
            }

            var cartItems = userCart.CartItems;

            if (cartItems.Count == 0)
            {
                throw new EmptyListException("Cart");
            }

            Order order = new Order
            {
                UserId = userId,
                ItemsServed = 0,
                OrderStatus = "Pending",
                TimeOfOrder = DateTime.Now,
            };

            await _orderRepository.Add(order);

            double total = 0;
            int count = 0;
            foreach (var cartItem in cartItems)
            {
                total += cartItem.FinalAmount;

                count += cartItem.Quantity;
                
                OrderDetail orderDetail = new OrderDetail
                {
                    CoffeeName = cartItem.Coffee.Name,
                    AddOns = cartItem.AddOns,
                    Discount = cartItem.Discount,
                    OrderId = order.OrderId,
                    Price = cartItem.CartItemPrice,
                    Quantity = cartItem.Quantity,
                    status = "Pending"

                };

                await DeleteCartItem(cartItem.CartItemId);

                await _orderDetailRepository.Add(orderDetail);


            }

            order.TotalPrice = total;
            order.TotalItems = count;
            await _orderRepository.Update(order);

            return order;
            
        }
    }
}
