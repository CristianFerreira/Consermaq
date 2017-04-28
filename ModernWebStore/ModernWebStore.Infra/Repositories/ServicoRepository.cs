using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace ModernWebStore.Infra.Repositories
{
    public class ServicoRepository : IServicoRepository
    {
        private StoreDataContext _context;


        public Servico Get(int id)
        {
            return _context.Servicos.Include(s => s.ServicoItems).First(x => x.Id == id); ;
        }


        public List<Servico> Get()
        {
            return _context.Servicos.Include(s=>s.ServicoItems).ToList();
        }

        public List<Servico> GetOrdemServico(int id)
        {
            return _context.Servicos.Where(s => s.OrdemServicoId == id).Include(s => s.User).ToList();
        }

        public ServicoRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(Servico servico)
        {
            _context.Servicos.Add(servico);
        }

        public void Update(Servico order)
        {
            _context.Entry<Servico>(order).State = EntityState.Modified;
        }

        public void Delete(Servico servico)
        {
            _context.Servicos.Remove(servico);
        }

   
    }
}
