using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IOrdemServicoApplicationService
    {
        List<OrdemServico> Get();
        List<OrdemServico> Get(int skip, int take);
        OrdemServico Get(int id);
        OrdemServico Create(OrdemServico ordemServico);
        OrdemServico Update(OrdemServico ordemServico);
        OrdemServico Delete(int id);
        List<OrdemServico> DeleteAlot(List<OrdemServico> ordemServicos);
    }
}
