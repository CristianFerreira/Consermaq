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

        public decimal ValorTotal { get; set; }

        public int ClienteId { get; set; }
        public Cliente Cliente { get; set; }

        public ICollection<Servico> Servicos { get; set; }
       
        public ICollection<Product> MateriaisAtualizados { get; set; }
        public ICollection<ServicoItem> ServicoItemsRemovidos { get; set; }
        public ICollection<Servico> ServicosRemovidos { get; set; }


        public void Aberto()
        {
            this.Status = EOrderStatus.Created;
        }

        public void Pendente()
        {
            this.Status = EOrderStatus.Pendente;
        }

        public void Finish()
        {

            this.Status = EOrderStatus.Finish;
        }

        public void Cancel()
        {          
            this.Status = EOrderStatus.Canceled;
        }
    }
}
