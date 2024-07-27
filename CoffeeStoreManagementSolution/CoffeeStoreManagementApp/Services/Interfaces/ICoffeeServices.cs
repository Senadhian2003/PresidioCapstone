using CoffeeStoreManagementApp.Models;

namespace CoffeeStoreManagementApp.Services.Interfaces
{
    public interface ICoffeeServices
    {

        public Task<List<Coffee>> GetAllCofffee();
        
        public Task<Coffee> GetCoffeeById(int id);

    }
}
