//using ModernWebStore.Domain.Entities;
//using ModernWebStore.Domain.Repositories;
//using ModernWebStore.Infra.Persistence.DataContexts;
//using System.Collections.Generic;
//using System.Data.Entity;
//using System.Linq;

//namespace ModernWebStore.Infra.Repositories
//{
//    public class PessoaJuridicaRepository : IPessoaJuridicaRepository
//    {
//        private StoreDataContext _context;

//        public PessoaJuridicaRepository(StoreDataContext context)
//        {
//            this._context = context;
//        }

//        public void Create(PessoaJuridica pj)
//        {
//            _context.pj.Add(pj);
//        }

//        public void Delete(PessoaJuridica pj)
//        {
//            _context.pj.Remove(pj);
//        }

//        public List<PessoaJuridica> Get()
//        {
//            return _context.pj.ToList();
//        }

//        public PessoaJuridica Get(int id)
//        {
//            return _context.pj.Find(id); ;
//        }

//        public List<PessoaJuridica> Get(int skip, int take)
//        {
//            return _context.pj
//               .OrderBy(x => x.Nome)
//               .Skip(skip).Take(take).ToList();
//        }

//        public void Update(PessoaJuridica pj)
//        {
//            _context.Entry<PessoaJuridica>(pj)
//               .State = EntityState.Modified;
//        }
//    }
//}
