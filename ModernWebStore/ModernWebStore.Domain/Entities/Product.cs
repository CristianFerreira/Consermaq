using System;
using ModernWebStore.Domain.Scopes;

namespace ModernWebStore.Domain.Entities
{
    public class Product
    {

        public int Id { get; set; }
        public string CodeProduct { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public decimal PriceBuy { get; set; }
        public int QuantityOnHand { get; set; }

        public void UpdateQuantityOnHand(int amount)
        {
            if (!this.UpdateQuantityOnHandScopeIsValid(amount))
                return;

            this.QuantityOnHand = amount;
        }

        public void Register()
        {
            if (!this.RegisterProductScopeIsValid())
                return;
        }

        public void UpdatePrice(decimal price)
        {
            if (!this.UpdatePriceScopeIsValid(price))
                return;

            this.PriceBuy = price;
        }

        public void UpdateInfo(string title, string description)
        {
            if (!this.UpdateInfoScopeIsValid(title, description))
                return;

            this.Title = title;
            this.Description = description;
        }


    }
}
