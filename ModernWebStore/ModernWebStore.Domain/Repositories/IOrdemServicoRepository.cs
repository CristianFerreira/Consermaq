using ModernWebStore.Domain.Entities;
using System.Collections.Generic;


namespace ModernWebStore.Domain.Repositories
{
    public interface IOrdemServicoRepository
    {
        List<OrdemServico> Get();
        List<OrdemServico> Get(int skip, int take);
        OrdemServico Get(int id);
        void Create(OrdemServico ordemServico);
        void Update(OrdemServico ordemServico);
        void Delete(OrdemServico ordemServico);
        OrdemServico ChangeStatus(int id);
        OrdemServico Pendente(int id);
        OrdemServico Finish(int id);
        OrdemServico Canceled(int id);
    }
}
