using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;

namespace ModernWebStore.Infra.Repositories
{
    public class PessoaFisicaRepository : IPessoaFisicaRepository
    {
        private StoreDataContext _context;

        public PessoaFisicaRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(PessoaFisica pf)
        {
            _context.pf.Add(pf);
        }

        public void Delete(PessoaFisica pf)
        {
            _context.pf.Remove(pf);
        }

        public List<PessoaFisica> Get()
        {
            return _context.pf.ToList();
        }

        public PessoaFisica Get(int id)
        {
            return _context.pf.Find(id); ;
        }

        public List<PessoaFisica> Get(int skip, int take)
        {
            return _context.pf
               .OrderBy(x => x.Nome)
               .Skip(skip).Take(take).ToList();
        }

        public void Update(PessoaFisica pf)
        {
            _context.Entry<PessoaFisica>(pf)
               .State = EntityState.Modified;
        }

    }
}
