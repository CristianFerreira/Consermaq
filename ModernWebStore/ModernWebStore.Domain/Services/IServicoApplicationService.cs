using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IServicoApplicationService
    {
        void Create(Servico servico);
        void Update(Servico servico);
        void Delete(Servico servico);
        List<Servico> Get();
        Servico Get(int id);
        List<Servico> buscarServicosComItens(int id);
        List<Servico> GetOrdemServico(int id);
    }
}
