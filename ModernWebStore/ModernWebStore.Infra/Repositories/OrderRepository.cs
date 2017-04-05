using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Specs;
using ModernWebStore.Infra.Persistence.DataContexts;
using System.Collections.Generic;
using System.Linq;
using System.Data.Entity;

namespace ModernWebStore.Infra.Repositories
{
    public class OrderRepository : IServicoRepository
    {
        private StoreDataContext _context;

        public OrderRepository(StoreDataContext context)
        {
            this._context = context;
        }

        public void Create(Servico servico)
        {
            _context.Servicos.Add(servico);
        }

        public List<Servico> Get(string email, int skip, int take)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetOrdersFromUser(email))
                .OrderByDescending(x => x.Date)
                .Skip(skip)
                .Take(take).ToList();
        }

        public List<Servico> GetCanceled(string email)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetCanceledOrders(email))
                .OrderByDescending(x => x.Date)
                .ToList();
        }

        public List<Servico> GetCreated(string email)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetCreatedOrders(email))
                .OrderByDescending(x => x.Date)
                .ToList();
        }

        public List<Servico> GetDelivered(string email)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetDeliveredOrders(email))
                .OrderByDescending(x => x.Date)
                .ToList();
        }

        public Servico GetDetails(int id, string email)
        {
            return _context.Servicos
                .Include(x => x.ServicoItems)
                .Where(OrderSpecs.GetOrderDetails(id, email))
                .FirstOrDefault();
        }

        public Servico GetHeader(int id, string email)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetOrderDetails(id, email))
                .FirstOrDefault();
        }

        public List<Servico> GetPaid(string email)
        {
            return _context.Servicos
                .Where(OrderSpecs.GetPaidOrders(email))
                .OrderByDescending(x => x.Date)
                .ToList();
        }

        public void Update(Servico order)
        {
            _context.Entry<Servico>(order).State = System.Data.Entity.EntityState.Modified;
        }
    }
}
