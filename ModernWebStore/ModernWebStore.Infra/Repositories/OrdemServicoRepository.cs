using System;
using System.Collections.Generic;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Linq;
using System.Data.Entity;
using ModernWebStore.Domain.Specs;

namespace ModernWebStore.Infra.Repositories
{
    public class OrdemServicoRepository : IOrdemServicoRepository
    {
        private StoreDataContext _context;

        public OrdemServicoRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(OrdemServico ordemServico)
        {
            _context.OrdemServico.Add(ordemServico);
        }

        public void Delete(OrdemServico ordemServico)
        {
            _context.OrdemServico.Remove(ordemServico);
        }

        public List<OrdemServico> Get()
        {
            return _context.OrdemServico.Include(os => os.Cliente).ToList();
        }

        public OrdemServico Get(int id)
        {
            return _context.OrdemServico.Include(os => os.Cliente).Include(s=>s.Servicos).First(x=>x.Id == id);
        }

        public List<OrdemServico> Get(int skip, int take)
        {
            return _context.OrdemServico
              .OrderBy(x => x.DataInicial)
              .Skip(skip).Take(take).Include(os => os.Cliente).ToList();
        }

        public void Update(OrdemServico ordemServico)
        {
            _context.Entry<OrdemServico>(ordemServico)
             .State = EntityState.Modified;
        }

        public OrdemServico ChangeStatus(int id)
        {
            return _context.OrdemServico
                .Where(x => x.Id == id)
                .FirstOrDefault();
        }

        public OrdemServico Canceled(int id)
        {
            return _context.OrdemServico
                .Where(OrdemServicoSpecs.Canceled(id)) 
                .FirstOrDefault();
        }

        public OrdemServico Pendente(int id)
        {
            return _context.OrdemServico
                .Where(OrdemServicoSpecs.Pendente(id))
                .FirstOrDefault();
        }

        public OrdemServico Finish(int id)
        {
            return _context.OrdemServico
                .Where(OrdemServicoSpecs.Finish(id))
                .FirstOrDefault();
        }
    }

}