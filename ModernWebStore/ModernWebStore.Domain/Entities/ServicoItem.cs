using ModernWebStore.Domain.Scopes;

namespace ModernWebStore.Domain.Entities
{
    public class ServicoItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int ServicoId { get; set; }
        public Servico Servico { get; set; }

        public bool Register()
        {
            return this.RegisterOrderItemScopeIsValid();
        }

        public void AddProduct(Product product, int quantity)
        {
            if (!this.AddProductScopeIsValid(product, quantity))
                return;

            this.ProductId = product.Id;
            this.Product = product;
            this.Quantity = quantity;

            // Reserva o estoque
            this.Product.UpdateQuantityOnHand(this.Product.QuantityOnHand - quantity);
        }
    }
}
