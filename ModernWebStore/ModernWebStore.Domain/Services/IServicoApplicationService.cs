using ModernWebStore.Domain.Commands.OrderCommands;
using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IServicoApplicationService
    {
        List<Servico> Get(string email, int skip, int take);
        List<Servico> GetCreated(string email);
        List<Servico> GetPaid(string email);
        List<Servico> GetDelivered(string email);
        List<Servico> GetCanceled(string email);
        Servico GetDetails(int id, string email);
        Servico Create(Servico servico, string email);
        void Pay(int id, string email);
        void Delivery(int id, string email);
        void Cancel(int id, string email);
    }
}
