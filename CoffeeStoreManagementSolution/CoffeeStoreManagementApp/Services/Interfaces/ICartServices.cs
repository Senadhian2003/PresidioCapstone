﻿using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Models.DTO;

namespace CoffeeStoreManagementApp.Services.Interfaces
{
    public interface ICartServices
    {

        public Task<List<CartItem>> GetCartItems(int userId);

        public Task<CartItem> AddItemToCart(AddItemToCartDTO addItemToCartDTO);

        public Task<CartItem> UpdateCartItemQuantity(UpdateCartItemDTO updateCartItemDTO);

        public Task<CartItem> DeleteCartItem(int cartItemId);
    }
}
