using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModernWebStore.Domain.Entities;

namespace ModernWebStore.ApplicationService
{
    public class ClienteApplicationService : ApplicationService, IClienteApplicationService
    {
        private IClienteRepository _repository;

        public ClienteApplicationService(IClienteRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
        }

        public Cliente Create(Cliente cliente)
        {
            //pf.Register();
            _repository.Create(cliente);

            if (Commit())
                return cliente;

            return null;
        }

        public Cliente Delete(int id)
        {
            var cliente = _repository.Get(id);
            _repository.Delete(cliente);

            if (Commit())
                return cliente;

            return null;
        }

        public List<Cliente> DeleteAlot(List<Cliente> clientes)
        {
            var listaCliente = new List<Cliente>();
            foreach (var cliente in clientes)
            {
                var clienteDelete = _repository.Get(cliente.Id);
                _repository.Delete(clienteDelete);

                if (Commit())
                    listaCliente.Add(clienteDelete);
                else
                    return null;
            }

            return listaCliente;
        }

        public Cliente Get(int id)
        {
            return _repository.Get(id);

        }

        public List<Cliente> Get(int skip, int take)
        {
            return _repository.Get(skip, take);
        }

        public List<Cliente> Get()
        {
            return _repository.Get();
        }

        public List<Cliente> GetPF()
        {
            return _repository.GetPF();
        }

        public List<Cliente> GetPJ()
        {
            return _repository.GetPJ();
        }

        public Cliente Update(Cliente cliente)
        {
            //pf.Register();
            _repository.Update(cliente);

            if (Commit())
                return cliente;

            return null;
        }
    }
}
