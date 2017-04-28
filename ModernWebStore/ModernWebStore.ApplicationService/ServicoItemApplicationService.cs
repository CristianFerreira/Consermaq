using System;
using System.Collections.Generic;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using ModernWebStore.Domain.Repositories;

namespace ModernWebStore.ApplicationService
{
    public class ServicoItemApplicationService : ApplicationService, IServicoItemApplicationService
    {
        private IServicoItemRepository _repository;

        public ServicoItemApplicationService(IServicoItemRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
        }

        public ServicoItem Create(ServicoItem servicoItem)
        {
            _repository.Create(servicoItem);

            if (Commit())
                return servicoItem;

            return null;
        }

        public ServicoItem Delete(int id)
        {
            var servicoItem = _repository.Get(id);
            _repository.Delete(servicoItem);

            if (Commit())
                return servicoItem;

            return null;
        }

        public List<ServicoItem> Get()
        {
            return _repository.Get();
        }

        public List<ServicoItem> Get(int skip, int take)
        {
            return _repository.Get(skip, take);
        }

        public ServicoItem Get(int id)
        {
            return _repository.Get(id);
        }

        public ServicoItem Update(ServicoItem servicoItem)
        {
            _repository.Update(servicoItem);

            if (Commit())
                return servicoItem;

            return null;
        }
    }
}
