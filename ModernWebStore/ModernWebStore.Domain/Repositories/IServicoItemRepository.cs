using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Repositories
{
    public interface IServicoItemRepository
    {
        List<ServicoItem> Get();
        List<ServicoItem> GetServico(int id);
        List<ServicoItem> Get(int skip, int take);
        ServicoItem Get(int id);
        void Create(ServicoItem servicoItem);
        void Update(ServicoItem servicoItem);
        void Delete(ServicoItem servicoItem);
    }
}
