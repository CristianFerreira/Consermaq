using ModernWebStore.Domain.Commands.OrderCommands;
using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IServicoApplicationService
    {
        Servico Create(Servico servico);
        Servico Update(Servico servico);
        List<Servico> Get();
        Servico Get(int id);
    }
}
