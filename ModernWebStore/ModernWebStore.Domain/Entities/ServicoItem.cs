using ModernWebStore.Domain.Scopes;

namespace ModernWebStore.Domain.Entities
{
    public class ServicoItem
    {
        public ServicoItem() { }

        public int Id { get; private set; }
        public int Quantity { get; private set; }

        public int ProductId { get; private set; }
        public Product Product { get; private set; }

        public int ServicoId { get; private set; }
        public Servico Servico { get; private set; }

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
