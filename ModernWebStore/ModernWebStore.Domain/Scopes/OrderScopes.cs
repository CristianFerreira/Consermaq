using ModernWebStore.Domain.Entities;
using ModernWebStore.SharedKernel.Validation;
using System.Linq;

namespace ModernWebStore.Domain.Scopes
{
    public static class OrderScopes
    {
        public static bool PlaceOrderScopeIsValid(this Servico servico)
        {
            return AssertionConcern.IsSatisfiedBy
            (
                AssertionConcern.AssertIsGreaterThan(servico.ServicoItems.Count(), 0, "Nenhum produto foi adicionado ao servico")
            );
        }
    }
}
