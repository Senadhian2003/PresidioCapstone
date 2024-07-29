using CoffeeStoreManagementApp.Models;

namespace CoffeeStoreManagementApp.Services.Interfaces
{
    public interface IOrderServices
    {

        public Task<List<Order>> ViewAllActiveOrders();

        public Task<List<Order>> ViewAllOrders();

        public Task<List<Order>> ViewMyActiveOrders(int userId);

        public Task<List<Order>> ViewAllMyOrders(int userId);
    }
}
