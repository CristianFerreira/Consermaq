﻿using ModernWebStore.Domain.Commands.ProductCommands;
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

        public List<Product> DeleteAlot(List<Product> produtos)
        {
            var listProduto = new List<Product>();
            foreach (var produto in produtos)
            {
                var produtoDelete = _repository.Get(produto.Id);
                _repository.Delete(produtoDelete);

                if (Commit())
                    listProduto.Add(produtoDelete);
                else
                    return null;
            }

            return listProduto;
        }

        public List<Product> Get()
        {
            return _repository.Get();
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

        public void Update(Product product)
        {
            _repository.Update(product);
            Commit();               
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
