﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModernWebStore.Domain.Entities
{
    public class PessoaFisica : Pessoa
    {
        public string CPF { get; set; }
    }
}
