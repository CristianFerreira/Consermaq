using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System.Collections.Generic;

namespace ModernWebStore.ApplicationService
{
    public class ServicoApplicationService : ApplicationService, IServicoApplicationService
    {
        private IServicoRepository _servicoRepository;
        private IProductApplicationService _productApplicationService;
        private IServicoItemApplicationService _servicoItemApplicationService;

        public ServicoApplicationService(IServicoRepository servicoRepository,                                        
                                        IProductApplicationService productApplicationService,
                                        IServicoItemApplicationService servicoItemApplicationService,
                                        IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._servicoRepository = servicoRepository;
            this._productApplicationService = productApplicationService;
            this._servicoItemApplicationService = servicoItemApplicationService;
        }

        public void Create(Servico servico)
        {
            _servicoRepository.Create(servico);
        }

        public List<Servico> buscarServicosComItens(int id)
        {
            var servicos = _servicoRepository.GetOrdemServico(id);

            if (servicos.Count > 0)
            {

                foreach (var item in servicos)
                {
                    var servicoItem = _servicoItemApplicationService.GetServico(item.Id);

                    item.ServicoItems = servicoItem;
                }
            }

            return servicos;
        }


        public void Update(Servico servico)
        {
            _servicoRepository.Update(servico);
        }


        public Servico Get(int id)
        {
            return _servicoRepository.Get(id);

        }

        public List<Servico> Get()
        {
            return _servicoRepository.Get();
        }


        public void Delete(Servico servico)
        {
            _servicoRepository.Delete(servico);
        }

        public List<Servico> GetOrdemServico(int id)
        {
            return _servicoRepository.GetOrdemServico(id);
        }


    }
}
