using ModernWebStore.Domain.Services;
using ModernWebStore.Infra.Persistence;
using System.Collections.Generic;
using ModernWebStore.Domain.Entities;
using ModernWebStore.Domain.Repositories;
using ModernWebStore.Domain.Enums;
using System;
using ModernWebStore.Domain.Scopes;

namespace ModernWebStore.ApplicationService
{
    public class OrdemServicoApplicationService : ApplicationService, IOrdemServicoApplicationService
    {
        private IOrdemServicoRepository _repository;
        private IServicoApplicationService _servicoApplicationService;
        private IServicoItemRepository _repositoryServicoItem;
        private IProductRepository _productRepository;
        private IUserRepository _userRepository;

        public OrdemServicoApplicationService(IOrdemServicoRepository repository,
                                              IServicoApplicationService servicoApplicationService, 
                                              IServicoItemRepository repositoryServicoItem,
                                              IProductRepository productRepository, 
                                              IUserRepository userRepository,
                                              IUnitOfWork unitOfWork) : base(unitOfWork)
        {
            this._repository = repository;
            this._servicoApplicationService = servicoApplicationService;
            this._repositoryServicoItem = repositoryServicoItem;
            this._productRepository = productRepository;
            this._userRepository = userRepository;
        }

        public OrdemServico Create(OrdemServico ordemServico)
        {
            //pf.Register();

            _repository.Create(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        public OrdemServico Delete(int id)
        {
            var ordemServico = _repository.Get(id);
            _repository.Delete(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        public List<OrdemServico> DeleteAlot(List<OrdemServico> ordemServico)
        {
            var ordemServicoLista = new List<OrdemServico>();
            foreach (var os in ordemServico)
            {
                var OSDelete = _repository.Get(os.Id);
                _repository.Delete(OSDelete);

                if (Commit())
                    ordemServicoLista.Add(OSDelete);
                else
                    return null;
            }

            return ordemServicoLista;
        }


        public List<OrdemServico> Get()
        {
            return _repository.Get();
        }

        public List<OrdemServico> listAllCanceled()
        {
            return _repository.listAllCanceled();
        }

        public OrdemServico Get(int id)
        {
            var ordemServico = _repository.Get(id);
            if (ordemServico != null)
            {
                var servicos = _servicoApplicationService.GetOrdemServico(id);

                if (servicos.Count > 0)
                {

                    foreach (var item in servicos)
                    {
                        var servicoItem = _repositoryServicoItem.GetServico(item.Id);

                        item.ServicoItems = servicoItem;
                    }
                }

                ordemServico.Servicos = servicos;
            }

            return ordemServico;
        }

        public List<OrdemServico> Get(int skip, int take)
        {
            return _repository.Get(skip, take);
        }

        public OrdemServico Update(OrdemServico ordemServico)
        {
            //lista de produtos para fazer update
            if (ordemServico.MateriaisAtualizados.Count > 0)
            {
                foreach (var item in ordemServico.MateriaisAtualizados)
                {
                    _productRepository.Update(item);
                }
            }

            //lista de items removidos para fazer delete
            if (ordemServico.ServicoItemsRemovidos.Count > 0)
            {
                foreach (var item in ordemServico.ServicoItemsRemovidos)
                {
                    var remover = _repositoryServicoItem.Get(item.Id);
                    _repositoryServicoItem.Delete(remover);
                }
            }

            //lista de servicos removidos para fazer delete
            if (ordemServico.ServicosRemovidos.Count > 0)
            {
                foreach (var item in ordemServico.ServicosRemovidos)
                {
                    var remover = _servicoApplicationService.Get(item.Id);
                    _servicoApplicationService.Delete(remover);
                }
            }

            if (ordemServico.Servicos.Count > 0)
            {
                foreach (var servico in ordemServico.Servicos)
                {
                    servico.User = null;
                    servico.OrdemServico = null;

                    //Create para servicos sem id, Senao Update
                    if (servico.Id < 1)
                    {
                        if (servico.ServicoItems != null)
                        {
                            if (servico.ServicoItems.Count > 0)
                            {
                                foreach (var item in servico.ServicoItems)
                                {
                                    item.Product = null;
                                    item.Servico = null;
                                }
                            }
                        }
                        //criando servico no contexto
                        _servicoApplicationService.Create(servico);
                    }
                    else if (servico.Id > 0)
                    {
                        if (servico.ServicoItems.Count > 0)
                        {
                            var listaServicoItemsCreate = new List<ServicoItem>();
                            var listaServicoItemsUpdate = new List<ServicoItem>();

                            //Populando lista de produtos para depois fazer update
                            foreach (var item in servico.ServicoItems)
                            {
                                item.Product = null;
                                item.Servico = null;
                                if (item.Id > 0)
                                {
                                    listaServicoItemsUpdate.Add(item);
                                }
                                else
                                {
                                    item.ServicoId = servico.Id;
                                    listaServicoItemsCreate.Add(item);
                                }
                            }

                            //limpar lista de servico
                            servico.ServicoItems.Clear();

                            //add no contexto para fazer update
                            if (listaServicoItemsUpdate.Count > 0)
                            {
                                foreach (var item in listaServicoItemsUpdate)
                                {
                                    _repositoryServicoItem.Update(item);
                                }
                            }

                            //create ServicoItems no contexto
                            if (listaServicoItemsCreate.Count > 0)
                            {
                                foreach (var item in listaServicoItemsCreate)
                                {
                                    _repositoryServicoItem.Create(item);
                                }
                            }
                        }
                        _servicoApplicationService.Update(servico);
                    }
                }
                ordemServico.Servicos = null;
                ordemServico.Cliente = null;

                //Altera status da ordem de servico
                ordemServico.Status = EOrderStatus.Pendente;
                _repository.Update(ordemServico);
                if (Commit())
                {
                    //popula usuario e produto dos items
                    foreach (var servico in ordemServico.Servicos)
                    {
                        servico.User = _userRepository.Get(servico.UserId);
                        if (servico.ServicoItems != null)
                        {
                            if (servico.ServicoItems.Count > 0)
                            {
                                foreach (var servicoItem in servico.ServicoItems)
                                {
                                    servicoItem.Product = _productRepository.Get(servicoItem.ProductId);
                                }
                            }
                        }
                    }
                    return ordemServico;
                }

            }
            else
            {
                ordemServico.Status = EOrderStatus.Created;
                _repository.Update(ordemServico);
                if (Commit())
                    return ordemServico;
            }

            return null;
        }

        public OrdemServico AtivarOrdemServico(OrdemServico ordemServico)
        {
            ordemServico.Servicos = _servicoApplicationService.buscarServicosComItens(ordemServico.Id);
            if (ordemServico.Servicos != null && ordemServico.Servicos.Count > 0)
            {
                foreach (var servico in ordemServico.Servicos)
                {
                    if (servico.ServicoItems != null)
                    {
                        var produtos = new List<Product>();
                        foreach (var item in servico.ServicoItems)
                        {
                            var produto = _productRepository.Get(item.ProductId);
                            if (ProductScopes.VerificationQuantityOnHandScopeIsValid(produto, (produto.QuantityOnHand - item.Quantity)))
                            {
                                var achou = false;
                                if (produtos.Count == 0)
                                {
                                        produto.QuantityOnHand = produto.QuantityOnHand - item.Quantity;
                                        produtos.Add(produto);
                                }
                                else
                                {
                                    foreach (var p in produtos)
                                    {
                                        if (p.Id == item.ProductId)
                                        {
                                            if (ProductScopes.VerificationQuantityOnHandScopeIsValid(produto, (p.QuantityOnHand - item.Quantity)))
                                            {
                                                p.QuantityOnHand = p.QuantityOnHand - item.Quantity;
                                                achou = true;
                                            }
                                        }
                                    }
                                    if (!achou)
                                    {
                                        produto.QuantityOnHand = produto.QuantityOnHand - item.Quantity;
                                        produtos.Add(produto);
                                    }
                                }
                            }
                        }

                        //percorrer lista salvar produto
                        foreach (var produto in produtos)
                        {
                            _productRepository.Update(produto);
                        }
                    }
                }
                ordemServico.Pendente();
            }
            else
            {
                ordemServico.Aberto();               
            }

            ordemServico.Cliente = null;
            ordemServico.Servicos = null;
            _repository.Update(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        

        public OrdemServico Cancel(OrdemServico ordemServico)
        {
            ordemServico.Servicos = _servicoApplicationService.buscarServicosComItens(ordemServico.Id);
            if (ordemServico.Servicos != null)
            {
                var produtos = new List<Product>();
                foreach (var servico in ordemServico.Servicos)
                {
                    if (servico.ServicoItems != null)
                    {
                        foreach (var item in servico.ServicoItems)
                        {
                            var produto = _productRepository.Get(item.ProductId);
                            var achou = false;
                            if (produtos.Count == 0)
                            {
                                produto.QuantityOnHand = produto.QuantityOnHand + item.Quantity;
                                produtos.Add(produto);
                            }
                            else
                            {
                                foreach (var p in produtos)
                                {
                                    if (p.Id == item.ProductId)
                                    {
                                        p.QuantityOnHand = p.QuantityOnHand + item.Quantity;
                                        achou = true;
                                    }
                                }
                                if (!achou)
                                {
                                    produto.QuantityOnHand = produto.QuantityOnHand + item.Quantity;
                                    produtos.Add(produto);
                                }
                            }
                        }

                        //percorrer lista salvar produto
                        foreach (var produto in produtos)
                        {
                            _productRepository.Update(produto);
                        }
                    }
                }
            }
            ordemServico.Cliente = null;
            ordemServico.Servicos = null;
            
            ordemServico.Cancel();
            _repository.Update(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }

        public void Pendente(int id)
        {
            var ordemServico = _repository.ChangeStatus(id);
            ordemServico.Pendente();
            _repository.Update(ordemServico);

            //Commit();
        }

        public OrdemServico RetornarPendente(int id)
        {
            var ordemServico = _repository.ChangeStatus(id);
            ordemServico.Pendente();
            ordemServico.DataEncerramento = null;
            _repository.Update(ordemServico);

            if (Commit())
                return ordemServico;

            return null;

        }

        public OrdemServico Finish(int id)
        {
            var ordemServico = _repository.ChangeStatus(id);
            ordemServico.DataEncerramento = DateTime.Now;
            ordemServico.Finish();
            _repository.Update(ordemServico);

            if (Commit())
                return ordemServico;

            return null;
        }
    }
}
