using ModernWebStore.Domain.Commands.ProductCommands;
using ModernWebStore.Domain.Entities;
using System.Collections.Generic;

namespace ModernWebStore.Domain.Services
{
    public interface IProductApplicationService
    {
        List<Product> Get();
        List<Product> Get(int skip, int take);
        List<Product> GetOutOfStock();
        Product Get(int id);
        Product Create(Product product);
        Product UpdateBasicInformation(Product product);
        void Update(Product product);
        Product Delete(int id);
        List<Product> DeleteAlot(List<Product> produtos);
    }
}
