//using CoffeeStoreManagementApp.Context;
//using CoffeeStoreManagementApp.Exceptions;
//using CoffeeStoreManagementApp.Models;
//using CoffeeStoreManagementApp.Repositories.Interface;
//using Microsoft.EntityFrameworkCore;

//namespace CoffeeStoreManagementApp.Repositories
//{
//    public class CoffeeSauceRepsoitory : IRepository<int,CoffeeSauce>
//    {

//        private readonly CoffeeManagementContext _context;
//        public CoffeeSauceRepsoitory(CoffeeManagementContext context)
//        {
//            _context = context;
//        }
//        public async Task<CoffeeSauce> Add(CoffeeSauce item)
//        {
//            _context.Add(item);
//            await _context.SaveChangesAsync();
//            return item;
//        }

//        public async Task<CoffeeSauce> DeleteByKey(int key1, int key2)
//        {
//            var coffeeSauce = await GetByKey(key1, key2);
//            if (coffeeSauce != null)
//            {
//                _context.Remove(coffeeSauce);
//                await _context.SaveChangesAsync(true);
//                return coffeeSauce;
//            }
//            throw new ElementNotFoundException("CoffeeSauce");
//        }

//        public async Task<CoffeeSauce> GetByKey(int key1, int key2)
//        {
//            var coffeeSauce = await _context.CoffeeSauces.FirstOrDefaultAsync(u => u.CoffeeId == key1 && u.SauceId==key2);

//            if (coffeeSauce != null)
//            {
//                return coffeeSauce;
//            }

//            throw new ElementNotFoundException("CoffeeSauce");
//        }

//        public async Task<IEnumerable<CoffeeSauce>> GetAll()
//        {
//            var coffeeSauces = await _context.CoffeeSauces.ToListAsync();

//            if (coffeeSauces.Any())
//            {
//                return coffeeSauces;
//            }

//            throw new EmptyListException("CoffeeSauce");

//        }

//        public async Task<CoffeeSauce> Update(CoffeeSauce item)
//        {
//            var coffeeSauce = await GetByKey(item.CoffeeId, item.SauceId);
//            if (coffeeSauce != null)
//            {
//                _context.Update(item);
//                await _context.SaveChangesAsync(true);
//                return coffeeSauce;
//            }
//            throw new ElementNotFoundException("CoffeeSauce");
//        }



//    }
//}
