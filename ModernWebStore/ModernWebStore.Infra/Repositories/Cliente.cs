using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Collections.Generic;
using System;
using System.Linq;
using System.Data.Entity;

namespace ModernWebStore.Infra.Repositories
{
    public class ClienteRepository : IClienteRepository
    {
        private StoreDataContext _context;

        public ClienteRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(Cliente cliente)
        {
            _context.Cliente.Add(cliente);
        }

        public void Delete(Cliente cliente)
        {
            _context.Cliente.Remove(cliente);
        }

        public Cliente Get(int id)
        {
            return _context.Cliente.Find(id); ;
        }

        public List<Cliente> Get(int skip, int take)
        {
            return _context.Cliente
              .OrderBy(x => x.Nome)
              .Skip(skip).Take(take).ToList();
        }

        public List<Cliente> Get()
        {
            return _context.Cliente.ToList();
        }

        public List<Cliente> GetPF()
        {
            return _context.Cliente.Where(c => c.CPF != null && c.CNPJ == null).ToList();
        }

        public List<Cliente> GetPJ()
        {
            return _context.Cliente.Where(c => c.CNPJ != null && c.CPF == null).ToList();
        }

        public void Update(Cliente cliente)
        {
            _context.Entry<Cliente>(cliente)
             .State = EntityState.Modified;
        }
    }
}
