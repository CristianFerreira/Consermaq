﻿using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System.Collections.Generic;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;

namespace ModernWebStore.ApplicationService
{
    public class OrdemServicoApplicationService : ApplicationService, IOrdemServicoApplicationService
    {
        private IOrdemServicoRepository _repository;

        public OrdemServicoApplicationService(IOrdemServicoRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
        }

        public OrdemServico Create(OrdemServico ordemServico)
        {
            //pf.Register();
            _repository.Create(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        public OrdemServico Delete(int id)
        {
            var ordemServico = _repository.Get(id);
            _repository.Delete(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        public List<OrdemServico> DeleteAlot(List<OrdemServico> ordemServico)
        {
            var ordemServicoLista = new List<OrdemServico>();
            foreach (var os in ordemServico)
            {
                var OSDelete = _repository.Get(os.Id);
                _repository.Delete(OSDelete);

                if (Commit())
                    ordemServicoLista.Add(OSDelete);
                else
                    return null;
            }

            return ordemServicoLista;
        }


        public List<OrdemServico> Get()
        {
            return _repository.Get();         
        }

        public OrdemServico Get(int id)
        {
            return _repository.Get(id);       
        }

        public List<OrdemServico> Get(int skip, int take)
        {
            return _repository.Get(skip, take);
        }

        public OrdemServico Update(OrdemServico ordemServico)
        {
            //pf.Register();
            _repository.Update(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }
    }
}