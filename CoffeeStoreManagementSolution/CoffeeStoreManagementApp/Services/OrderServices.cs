using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Repositories.Interface;
using CoffeeStoreManagementApp.Services.Interfaces;

namespace CoffeeStoreManagementApp.Services
{
    public class OrderServices : IOrderServices
    {
        private readonly IRepository<int, Order> _orderRepository;
        private readonly IRepository<int, OrderDetail> _orderDetailRepository;
        public OrderServices(IRepository<int, Order> orderRepository, IRepository<int, OrderDetail> orderDetailRepository) { 
        
            _orderRepository = orderRepository;
            _orderDetailRepository = orderDetailRepository;

        }

        public async Task<List<Order>> ViewAllActiveOrders()
        {
            var orders = await _orderRepository.GetAll();

            var activeOrders = orders.Where(o => o.OrderStatus == "Pending");

            if (activeOrders.Count() == 0)
            {
                throw new EmptyListException("Order");
            }

            return activeOrders.ToList();

        }

        public async Task<List<Order>> ViewAllMyOrders(int userId)
        {

            var orders = await _orderRepository.GetAll();

            var myOrders = orders.Where(o => o.UserId == userId);

            if (myOrders.Count() == 0)
            {
                throw new EmptyListException("Order");
            }

            return myOrders.ToList();


        }

        public async Task<List<Order>> ViewAllOrders()
        {
            var orders = await _orderRepository.GetAll();

            if (orders.Count() == 0)
            {
                throw new EmptyListException("Order");
            }

            return orders.ToList();

        }

        public async Task<List<Order>> ViewMyActiveOrders(int userId)
        {
            var orders = await _orderRepository.GetAll();

            var myActiveOrders = orders.Where(o =>o.UserId == userId && o.OrderStatus == "Pending");

            if (myActiveOrders.Count() == 0)
            {
                throw new EmptyListException("Order");
            }

            return myActiveOrders.ToList();
        }

        public async Task<List<OrderDetail>> UpdateOrderDetail(UpdateOrderDetailDTO dto)
        {
            var orderDetail = await _orderDetailRepository.GetByKey(dto.OrderDetailId);

            if (orderDetail == null)
            {
                throw new ElementNotFoundException("Order Detail");
            }

            Order order = await _orderRepository.GetByKey(orderDetail.OrderId);
            string currentStatus = orderDetail.Status;

            if(currentStatus == "Collected" && dto.Status == "Collected")
            {
                throw new OrderAlreadyCollectedException();
            }

            if (dto.Status == "Collected")
            {
                orderDetail.Status = dto.Status;
                order.ItemsServed += 1;
                if(order.ItemsServed == order.TotalItems)
                {
                    order.OrderStatus = "Collected";
                    await _orderRepository.Update(order);
                }

                await _orderDetailRepository.Update(orderDetail);


            }
            else
            {
                if(currentStatus== "Collected")
                {
                    order.ItemsServed -= 1;
                    order.OrderStatus = "Pending";
                    await _orderRepository.Update(order) ;
                }

                orderDetail.Status = dto.Status;


            }

            throw new NotImplementedException();


        }



    }
}
