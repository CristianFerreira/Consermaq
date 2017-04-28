using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System;
using System.Collections.Generic;

namespace ModernWebStore.ApplicationService
{
    public class ServicoApplicationService : ApplicationService, IServicoApplicationService
    {
        private IServicoRepository _servicoRepository;
        private IOrdemServicoApplicationService _ordemServicoApplicationService;
        private IProductRepository _productRepository;

        public ServicoApplicationService(IServicoRepository servicoRepository, IOrdemServicoApplicationService ordemServicoApplicationService, IProductRepository productRepository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._servicoRepository = servicoRepository;
            this._ordemServicoApplicationService = ordemServicoApplicationService;
            this._productRepository = productRepository;
        }

        public Servico Create(Servico servico)
        {
            if (servico.ServicoItems != null)
            {
                if (servico.ServicoItems.Count > 0)
                {
                    foreach (var item in servico.ServicoItems)
                    {
                        _productRepository.Update(item.Product);
                        item.Product = null;
                    }
                }
            }
            //Altera status da ordem de servico
            _ordemServicoApplicationService.Pendente(servico.OrdemServicoId);
            _servicoRepository.Create(servico);


            if (Commit())
                return servico;

            return null;
        }


        public Servico Update(Servico servico)
        {
            if (servico.ServicoItems.Count > 0)
            {
                foreach (var item in servico.ServicoItems)
                {
                    _productRepository.Update(item.Product);
                    item.Product = null;
                }
            }

            //Altera status da ordem de servico
            _ordemServicoApplicationService.Pendente(servico.OrdemServicoId);
            _servicoRepository.Create(servico);


            if (Commit())
                return servico;

            return null;
        }

        public Servico Get(int id)
        {
            return _servicoRepository.Get(id);

        }

        public List<Servico> Get()
        {
            return _servicoRepository.Get();
        }



    }
}
