using ModernWebStore.Domain.Entities;
using System;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IOrdemServicoApplicationService
    {
        List<OrdemServico> Get();
        List<OrdemServico> listAllCanceled();
        List<OrdemServico> Get(int skip, int take);
        OrdemServico Get(int id);
        OrdemServico Create(OrdemServico ordemServico);
        OrdemServico Update(OrdemServico ordemServico);
        OrdemServico Delete(int id);
        List<OrdemServico> DeleteAlot(List<OrdemServico> ordemServicos);
        OrdemServico Cancel(OrdemServico ordemServico);
        void Pendente(int id);
        OrdemServico RetornarPendente(int id);
        OrdemServico Finish(int id);
        OrdemServico AtivarOrdemServico(OrdemServico ordemServico);
        List<OrdemServico> BuscarPorData(DateTime dataInicial, DateTime? dataEncerramento);
    }
}
