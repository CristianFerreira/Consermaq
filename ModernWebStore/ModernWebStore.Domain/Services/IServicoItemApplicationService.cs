using ModernWebStore.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModernWebStore.Domain.Services
{
    public interface IServicoItemApplicationService
    {
        List<ServicoItem> Get();
        List<ServicoItem> Get(int skip, int take);
        ServicoItem Get(int id);
        ServicoItem Create(ServicoItem servicoItem);
        ServicoItem Update(ServicoItem servicoItem);
        ServicoItem Delete(int id);
    }
}
