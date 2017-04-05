using ModernWebStore.Domain.Entities;
using System.Collections.Generic;


namespace ModernWebStore.Domain.Repositories
{
    public interface IClienteRepository
    {
        List<Cliente> Get();
        List<Cliente> GetPF();
        List<Cliente> GetPJ();
        List<Cliente> Get(int skip, int take);
        Cliente Get(int id);
        void Create(Cliente pf);
        void Update(Cliente pf);
        void Delete(Cliente pf);
    }
}

