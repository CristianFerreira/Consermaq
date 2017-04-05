using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModernWebStore.Domain.Entities
{
    public class Cliente
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
        public string CEP { get; set; }
        public string Celular { get; set;}
        public string Telefone { get; set; }
        public string Observacao { get; set; }
        public string CPF { get; set; }
        public string CNPJ { get; set; }
        
        public ICollection<OrdemServico> OrdemServicos { get; set; }

    }
}
