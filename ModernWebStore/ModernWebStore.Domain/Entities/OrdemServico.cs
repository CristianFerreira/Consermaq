using ModernWebStore.Domain.Enums;
using ModernWebStore.Domain.Scopes;
using System;
using System.Collections.Generic;
using System.Linq;

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
        public DateTime DataInicial { get; set; }
        public DateTime DataEncerramento { get; set; }

        public EOrderStatus Status { get; set; }

        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public ICollection<Servico> Servicos { get; set; }
    }
}
