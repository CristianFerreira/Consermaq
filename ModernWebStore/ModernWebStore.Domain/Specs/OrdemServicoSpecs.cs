using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Enums;
using System;
using System.Linq.Expressions;

namespace ModernWebStore.Domain.Specs
{
    public static class OrdemServicoSpecs
    {
        public static Expression<Func<OrdemServico, bool>> OrdemServicoCreated(int id)
        {
            return x => x.Id == id && x.Status == EOrderStatus.Created;
        }

        public static Expression<Func<OrdemServico, bool>> Pendente(int id)
        {
            return x => x.Id == id  && x.Status == EOrderStatus.Pendente;
        }

        public static Expression<Func<OrdemServico, bool>> Finish(int id)
        {
            return x => x.Id == id && x.Status == EOrderStatus.Finish;
        }

        public static Expression<Func<OrdemServico, bool>> Canceled(int id)
        {
            return x => x.Id == id && x.Status == EOrderStatus.Canceled;
        }
    }
}
