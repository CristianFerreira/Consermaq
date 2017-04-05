using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Repositories
{
    public interface IServicoRepository
    {
        List<Servico> Get(string email, int skip, int take);
        List<Servico> GetCreated(string email);
        List<Servico> GetPaid(string email);
        List<Servico> GetDelivered(string email);
        List<Servico> GetCanceled(string email);
        Servico GetDetails(int id, string email);
        Servico GetHeader(int id, string email);
        void Create(Servico order);
        void Update(Servico order);
    }
}
