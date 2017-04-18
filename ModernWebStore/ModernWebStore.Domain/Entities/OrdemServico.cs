using ModernWebStore.Domain.Enums;
using System;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Entities
{
    public class OrdemServico
    {
        public OrdemServico()
        {
            this.Status = EOrderStatus.Created;
            this.DataInicial = DateTime.Now;
        }

        public int Id { get; set; }

        public string servicoSolicitado { get; set; }
        public DateTime? DataInicial { get; set; }
        public DateTime? DataEncerramento { get; set; }

        public EOrderStatus Status { get; set; }

        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public ICollection<Servico> Servicos { get; set; }


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
