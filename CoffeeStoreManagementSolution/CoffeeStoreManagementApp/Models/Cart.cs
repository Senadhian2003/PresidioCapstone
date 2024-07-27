using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CoffeeStoreManagementApp.Models
{
    public class Cart
    {
        [Key]
        public int CartId { get; set; }

        public int UserId { get; set; }
        public User User { get; set; }

        public double Total { get; set; }

        public ICollection<CartItem> CartItems { get; set; }

       

    }
}
