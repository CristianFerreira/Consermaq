using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Repositories
{
    public interface IPessoaJuridicaRepository
    {
        List<PessoaJuridica> Get();
        List<PessoaJuridica> Get(int skip, int take);
        PessoaJuridica Get(int id);
        void Create(PessoaJuridica pj);
        void Update(PessoaJuridica pj);
        void Delete(PessoaJuridica pj);
    }
}
