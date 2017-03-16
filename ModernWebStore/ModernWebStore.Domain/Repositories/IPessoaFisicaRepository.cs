using ModernWebStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModernWebStore.Domain.Repositories
{
    public interface IPessoaFisicaRepository
    {
        List<PessoaFisica> Get();
        List<PessoaFisica> Get(int skip, int take);
        PessoaFisica Get(int id);
        void Create(PessoaFisica pf);
        void Update(PessoaFisica pf);
        void Delete(PessoaFisica pf);
    }
}
