using ModernWebStore.Domain.Entities;
using ModernWebStore.SharedKernel.Validation;

namespace ModernWebStore.Domain.Scopes
{
    public static class OrderItemScopes
    {
        public static bool RegisterOrderItemScopeIsValid(this ServicoItem serviceItem)
        {
            return AssertionConcern.IsSatisfiedBy
            (
                AssertionConcern.AssertIsGreaterThan(serviceItem.ProductId, 0, "Produto inválido"),
                AssertionConcern.AssertIsGreaterThan(serviceItem.Quantity, 0, "Quantidade inválida")
            );
        }

        public static bool AddProductScopeIsValid(this ServicoItem serviceItem, Product product, int quantity)
        {
            return AssertionConcern.IsSatisfiedBy
            (
                AssertionConcern.AssertIsGreaterOrEqualThan((product.QuantityOnHand - quantity), 0, "Produto fora de estoque: " + product.Title),
                AssertionConcern.AssertIsGreaterThan(quantity, 0, "Quantidade deve ser maior que zero")
            );
        }
    }
}
