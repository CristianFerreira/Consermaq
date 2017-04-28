using ModernWebStore.Domain.Repositories;
using ModernWebStore.Infra.Persistence.DataContexts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ModernWebStore.Domain.Entities;
using System.Data.Entity;

namespace ModernWebStore.Infra.Repositories
{
    public class ServicoItemRepository : IServicoItemRepository
    {
        private StoreDataContext _context;

        public ServicoItemRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(ServicoItem servicoItem)
        {
            _context.ServicosItems.Add(servicoItem);
        }

        public void Delete(ServicoItem servicoItem)
        {
            _context.ServicosItems.Remove(servicoItem);
        }

        public List<ServicoItem> Get()
        {
            return _context.ServicosItems.Include(si => si.Product).ToList();
        }

        public List<ServicoItem> Get(int skip, int take)
        {
            return _context.ServicosItems
             .OrderBy(x => x.Id)
             .Skip(skip).Take(take).ToList(); ;
        }

        public ServicoItem Get(int id)
        {
            return _context.ServicosItems.Include(si => si.Product).FirstOrDefault(si => si.Id == id);
        }

        public List<ServicoItem> GetServico(int id)
        {
            return _context.ServicosItems.Include(si => si.Product).Include(si => si.Servico).Where(x => x.ServicoId == id).ToList();
        }

        public void Update(ServicoItem servicoItem)
        {
            _context.Entry<ServicoItem>(servicoItem)
             .State = EntityState.Modified;
        }
    }
}
