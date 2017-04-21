using ModernWebStore.Domain.Commands.OrderCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System;
using System.Linq;
using System.Collections.Generic;

namespace ModernWebStore.ApplicationService
{
    public class OrderApplicationService : ApplicationService, IServicoApplicationService
    {
        private IServicoRepository _servicoRepository;
        private IUserRepository _userRepository;
        private IProductRepository _productRepository;

        public OrderApplicationService(IServicoRepository servicoRepository, IUserRepository userRepository, IProductRepository productRepository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._servicoRepository = servicoRepository;
            this._userRepository = userRepository;
            this._productRepository = productRepository;
        }

        public void Cancel(int id, string email)
        {
            var servico = _servicoRepository.GetHeader(id, email);
            servico.Cancel();
            _servicoRepository.Update(servico);

            Commit();
        }

        public Servico Create(Servico servico)
        {
            var serviceItems = new List<ServicoItem>();
            foreach (var item in servico.ServicoItems)
            {
                var serviceItem = new ServicoItem();
                var product = _productRepository.Get(item.ProductId);
                serviceItem.AddProduct(product, item.Quantity);
                serviceItems.Add(serviceItem);
            }

            var newServico = new Servico(serviceItems, servico.UserId, servico.OrdemServicoId);
            //service.Place();
            _servicoRepository.Create(newServico);

            if (Commit())
                return newServico;

            return null;
        }

        public void Delivery(int id, string email)
        {
            throw new NotImplementedException();
        }

        public List<Servico> Get(string email, int skip, int take)
        {
            throw new NotImplementedException();
        }

        public List<Servico> GetCanceled(string email)
        {
            throw new NotImplementedException();
        }

        public List<Servico> GetCreated(string email)
        {
            throw new NotImplementedException();
        }

        public List<Servico> GetDelivered(string email)
        {
            throw new NotImplementedException();
        }

        public Servico GetDetails(int id, string email)
        {
            throw new NotImplementedException();
        }

        public List<Servico> GetPaid(string email)
        {
            throw new NotImplementedException();
        }

        public void Pay(int id, string email)
        {
            throw new NotImplementedException();
        }
    }
}
