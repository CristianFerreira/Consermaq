using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IClienteApplicationService
    {
        List<Cliente> Get();
        List<Cliente> GetPF();
        List<Cliente> GetPJ();
        List<Cliente> Get(int skip, int take);
        Cliente Get(int id);
        Cliente Create(Cliente cliente);
        Cliente Update(Cliente cliente);
        Cliente Delete(int id);
        List<Cliente> DeleteAlot(List<Cliente> clientes);
    }
}
