using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Repositories
{
    public interface IServicoRepository
    {
        void Create(Servico servico);
        void Update(Servico servico);
        void Delete(Servico servico);
        List<Servico> Get();
        List<Servico> GetOrdemServico(int id);
        Servico Get(int id);
    }
}
