using ModernWebStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ModernWebStore.Api.Sistema
{
    public class SistemaContexto
    {
        public User UsuarioLogado { get; set; }
    }
}