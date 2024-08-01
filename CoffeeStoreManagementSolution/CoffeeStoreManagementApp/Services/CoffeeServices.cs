using CoffeeStoreManagementApp.Exceptions;
using CoffeeStoreManagementApp.Models;
using CoffeeStoreManagementApp.Models.DTO;
using CoffeeStoreManagementApp.Repositories;
using CoffeeStoreManagementApp.Repositories.Interface;
using CoffeeStoreManagementApp.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CoffeeStoreManagementApp.Services
{
    public class CoffeeServices : ICoffeeServices
    {

        public readonly IRepository<int,Coffee> _coffeeRepository;

        public CoffeeServices(IRepository<int,Coffee> coffeeRepository) {
            _coffeeRepository = coffeeRepository;
        }

        public async Task<List<Coffee>> GetAllCofffee()
        {
            var coffees = await _coffeeRepository.GetAll();
            
            if(coffees.Any())
            {
                return coffees.OrderBy(c=>c.Price).ToList();
            }

            throw new EmptyListException("Coffee");

        }

        public async Task<Coffee> GetCoffeeById(int id)
        {
            var coffee = await _coffeeRepository.GetByKey(id);

            if(coffee == null)
            {
                throw new ElementNotFoundException("Coffee");
            }

            return coffee;
        }

        public async Task<Coffee> UpdateCoffeDetails(UpdateCoffeeDTO updateCoffeeDTO)
        {
            var coffee = await _coffeeRepository.GetByKey(updateCoffeeDTO.CoffeeId);

            if (coffee == null)
            {
                throw new ElementNotFoundException("Coffee");
            }

            coffee.Name = updateCoffeeDTO.Name;
            coffee.Description = updateCoffeeDTO.Description;
            coffee.Price = updateCoffeeDTO.Price;
            coffee.IsAvailable = updateCoffeeDTO.Status;

            await _coffeeRepository.Update(coffee);

            return coffee;


        }

        

    }
}
