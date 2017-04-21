using ModernWebStore.Domain.Enums;
using ModernWebStore.Domain.Scopes;
using System;
using System.Collections.Generic;
using System.Linq;

namespace ModernWebStore.Domain.Entities
{
    public class Servico
    {
        private IList<ServicoItem> servicoItems;

        public Servico(IList<ServicoItem> servicoItems, int userId, int ordemServicoId)
        {
            this.servicoItems = new List<ServicoItem>();
            servicoItems.ToList().ForEach(x => AddItem(x));
            this.UserId = userId;
            this.Status = EOrderStatus.Created;
            this.OrdemServicoId = ordemServicoId;   
        }

        public int Id { get; set; }
        public DateTime InicioServico { get; set; }
        public DateTime FimServico { get; set; }
        public string ServicoEfetuado { get; set; }
        public string Ocorrencia { get; set; }
        public string Causa { get; set; }

        public IList<ServicoItem> ServicoItems
        {
            get { return servicoItems; }
            private set { servicoItems = new List<ServicoItem>(value); }
        }

        public EOrderStatus Status { get; set; }

        public int OrdemServicoId { get; set; }
        public OrdemServico OrdemServico { get; set; }

        public int UserId { get; private set; }
        public User User { get; private set; }
        //public decimal Total
        //{
        //    get
        //    {
        //        decimal total = 0;
        //        foreach (var item in _servicoItems)
        //            total += (item.Price * item.Quantity);

        //        return total;
        //    }
        //}
       

        public void AddItem(ServicoItem item)
        {
            if (item.Register())
                servicoItems.Add(item);
        }

        public void Place()
        {
            if (!this.PlaceOrderScopeIsValid())
                return;
        }

        public void MarkAsPaid()
        {
            // Dá baixa no estoque
            this.Status = EOrderStatus.Paid;
        }

        public void MarkAsDelivered()
        {
            this.Status = EOrderStatus.Delivered;
        }

        public void Cancel()
        {
            // Estorna os produtos

            this.Status = EOrderStatus.Canceled;
        }
    }
}
