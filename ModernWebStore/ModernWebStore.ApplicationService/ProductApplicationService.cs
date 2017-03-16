using ModernWebStore.Domain.Commands.ProductCommands;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System.Collections.Generic;

namespace ModernWebStore.ApplicationService
{
    public class ProductApplicationService : ApplicationService, IProductApplicationService
    {
        private IProductRepository _repository;

        public ProductApplicationService(IProductRepository repository, IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
        }

        public Product Create(Product product)
        {        
            product.Register();
            _repository.Create(product);

            if (Commit())
                return product;

            return null;
        }

        public Product Delete(int id)
        {
            var product = _repository.Get(id);
            _repository.Delete(product);

            if (Commit())
                return product;

            return null;
        }

        public List<Product> Get()
        {
            return _repository.GetProductsInStock();
        }

        public Product Get(int id)
        {
            return _repository.Get(id);
        }

        public List<Product> Get(int skip, int take)
        {
            return _repository.Get(skip, take);
        }

        public List<Product> GetOutOfStock()
        {
            return _repository.GetProductsOutOfStock();
        }

        public Product UpdateBasicInformation(Product product)
        {
            product.UpdateInfo(product.Title, product.Description);
            _repository.Update(product);

            if (Commit())
                return product;

            return null;
        }
    }
}
