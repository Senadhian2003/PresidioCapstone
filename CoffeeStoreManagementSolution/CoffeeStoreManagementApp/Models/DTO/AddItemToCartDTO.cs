namespace CoffeeStoreManagementApp.Models.DTO
{
    public class AddItemToCartDTO
    {
        public int UserId { get; set; }

        public int CoffeeId { get; set; } 


        public string AddOn { get; set;}

        public double Price { get; set;}
    }
}
