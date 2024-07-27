﻿using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace CoffeeStoreManagementApp.Models
{
    public class OrderDetail
    {
        [Key]
        public int OrderDetailId { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }

        public string CoffeeName { get; set; }

        public string AddOns { get; set; }

        public double Price { get; set; }

        public double Discount { get; set; } = 0;

        public double FinalAmount => Price - Discount;

        public string? status { get; set; }



    }
}
