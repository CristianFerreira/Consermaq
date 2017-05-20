/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class ModalServicoController {

        static $inject = ['OrdemServicoService', 'UsuarioService', 'ProdutoService','ServicoService', 
                            'toastr', '$mdDialog', '$timeout', '$q','ordemServico','ultimoItems','servico'];

     
        private ordemServicoService: OrdemServicoService;
        private usuarioService: UsuarioService;
        private produtoService: ProdutoService;
        private servicoService: ServicoService;
        public toastr: Toastr;     
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public ordemServico: OrdemServico;
        public ultimoItems: Array<Produto>;
        public servico: Servico; 
        public selectedItem : any;
        public searchText   : any; 
        public usuarios: Array<User>; 
        public produtos: Array<ProdutoABS>;  
        public produtosAdicionados: Array<Produto>;
        public servicoItems: Array<ServicoItem>;
        public adicionarMaterial: boolean;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public limitOptionsMaterialAdicionado: Array<any>;
        public optionsMaterialAdicionado: any;
        public queryMaterialAdicionado: any;
        public qntdSaida: number;
        public dataMinCalendarioInicioServico: Date;
        public dataMaxCalendarioInicioServico: Date;

        public servicoItemsRemovidos: Array<ServicoItem>;

        constructor(ordemServicoService: OrdemServicoService, usuarioService: UsuarioService, 
                    produtoService: ProdutoService,
                    servicoService: ServicoService,
                    toastr: Toastr,                  
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService,
                    ordemServico: OrdemServico,
                    ultimoItems: Array<Produto>,
                    servico: Servico) {

            this.ordemServicoService = ordemServicoService;
            this.usuarioService = usuarioService;
            this.produtoService = produtoService;
            this.servicoService = servicoService;
            this.toastr = toastr;       
            this.mdDialog = mdDialog; 
            this.timeout = timeout;
            this.$q = $q;         
            this.ordemServico = ordemServico;   
            this.ultimoItems = ultimoItems;  
            this.servico = servico;
            this.usuarios = new Array<User>();
            this.produtos = new Array<ProdutoABS>();
            this.adicionarMaterial = false;
            this.options = {
                             rowSelection: true,
                             multiSelect: true,
                             autoSelect: false,
                             decapitate: false,
                             largeEditDialog: false,
                             boundaryLinks: true,
                             limitSelect: true,
                             pageSelect: true
            };
            this.query = {
                            order: 'name',
                            limit: 3,
                            page: 1
            };

            this.optionsMaterialAdicionado = {
                             rowSelection: true,
                             multiSelect: true,
                             autoSelect: false,
                             decapitate: false,
                             largeEditDialog: false,
                             boundaryLinks: true,
                             limitSelect: true,
                             pageSelect: true
            };
            this.queryMaterialAdicionado = {
                            order: 'name',
                            limit: 3,
                            page: 1
            };

            this.servicoItems = new Array<ServicoItem>();
            this.produtosAdicionados = new Array<Produto>();
            this.servicoItemsRemovidos = new Array<ServicoItem>();

            this.dataMinCalendarioInicioServico = new Date();
            this.dataMinCalendarioInicioServico.setDate(- 60);
            this.dataMaxCalendarioInicioServico = new Date();
            this.load();          
        }

        public load (){
            this.loadUser();
            this.loadProduto();
            if(this.servico != null)
                this.popularServico();
        }

        public popularServico(): void {
            this.selectedItem = this.servico.user;
            if(this.servico.servicoItems.length > 0){
                this.servicoItems = this.servico.servicoItems;
                this.adicionarMaterial = true;

                if(this.servicoItems.length > 0 && this.ultimoItems.length > 0)
                    this.populaServicoItems(this.ultimoItems);
            }
             
        }

        public loadProduto() :void {
           this.produtoService.listAll()
                .then((data) => {                 
                    this.produtos = data; 
                    if(this.ultimoItems.length > 0){
                        this.populaProdutos(this.ultimoItems);                  
                    }
                                                      
                })
                .catch((response) => console.log("Não foi possivel carregar os Produtos, erro: " + response));
        }

        public populaServicoItems(ultimoItems: Array<Produto>) :void {
            this.servicoItems.filter((s)=> {
                ultimoItems.filter((u) => {
                    if(s.product.id == u.id){
                        s.product = u;
                    }
                })
            })
        }

        public populaProdutos(ultimoItems: Array<Produto>) :void {
            this.produtos.filter((p) => {
                this.ultimoItems.filter((u) => {
                    if(p.id == u.id){
                        p.quantityOnHand = u.quantityOnHand;
                    }
                })
            } )
        }

        public loadUser() :void {
            this.usuarioService.listAll()
            .then((data) => {
                 this.usuarios = data.map((c) => {
                        c.nome = c.nome.toUpperCase();
                        return c;
                 });  
            })
            .catch((response) => {console.log("Não foi possivel carregar os usuarios, erro: " + response)});
        }

        public buscarUsuario (query) :any {
            var results = query ? this.usuarios.filter((c) => {return this.filterUser(query,c)} ) : this.usuarios.filter((c) => c.id != null);
            var deferred = this.$q.defer();
            this.timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
            return deferred.promise;
        }


         public filterUser(query, user) :any{
           query = angular.uppercase(query)          
           if(user) {
                    return (user.nome.indexOf(query) === 0);
           } 
           else {
                    return false;
           }                
        };

        public addMaterial(produto :ProdutoABS) :void {
            if(produto.qntdSaida > 0)
            {
                if(produto.quantityOnHand - produto.qntdSaida >= 0){
                    this.atualizaMaterialAdicionado(produto);
                    this.adicionaListaMaterial(produto);
                    this.limparQntdSaida(produto);
                    this.toastr.success("Material: "+produto.title,"Adicionado com sucesso");
                } else {
                    this.toastr.error("Qntd de Saída maior que Qntd de Estoque.","Quantidade inválida!")
                }
            } else {
                this.toastr.error("Informe um valor no campo Qntd de Saída.","Quantidade inválida!")
            }

        }

        public adicionaListaMaterial(produto :ProdutoABS) :void {
             var servicoItem = new ServicoItem();
             servicoItem.productId = produto.id;
             servicoItem.product = this.populaProduto(produto);
             servicoItem.quantity = produto.qntdSaida;
             servicoItem.servico = null;
             servicoItem.servicoId = null;
             servicoItem.id = null;

             if(this.servicoItems.length > 0) {
                var existe = false;
                this.servicoItems.filter((s) => {
                    if(s.productId == servicoItem.productId){
                        s.quantity = Number(s.quantity) + Number(servicoItem.quantity);
                        // teste
                        s.product = servicoItem.product;
                        existe = true;
                    }
                })
                if(!existe){
                    this.servicoItems.push(servicoItem);
                }
             }else {
                 this.servicoItems.push(servicoItem);
             }         
        }

        public populaProduto(produtoABS :ProdutoABS) :Produto {
            var produto = new Produto();
            produto.id = produtoABS.id;
            produto.codeProduct = produtoABS.codeProduct;
            produto.description = produtoABS.description;
            produto.priceBuy = produtoABS.priceBuy;
            produto.quantityOnHand = produtoABS.quantityOnHand;
            produto.title = produtoABS.title;

            return produto;
        }

        public atualizaMaterialAdicionado(produto: ProdutoABS) : void{
            var index = this.produtos.indexOf(produto);
            if(index > -1) {               
                this.produtos[index].quantityOnHand = this.produtos[index].quantityOnHand - produto.qntdSaida;  
                this.addMaterialNovaLista(angular.copy(this.produtos[index]));           
            }
        }

        public addMaterialNovaLista(produtoABS: ProdutoABS) :void {
             produtoABS.qntdSaida = null;
             var produto = new Produto();
             produto = angular.copy(produtoABS);
             

             if(this.produtosAdicionados.length > 0){
                 var existe = false;
                 this.produtosAdicionados.filter((p) => {
                     if(p.id == produto.id){
                         p.quantityOnHand = produto.quantityOnHand ;
                         existe = true;
                     }
                 })
                 
                 if(!existe) {
                    this.produtosAdicionados.push(produto);
                 }
             } else {
                 this.produtosAdicionados.push(produto);
             }
             
        }

        public limparQntdSaida(produto :ProdutoABS) :void {
            var index = this.produtos.indexOf(produto);
             if(index > -1) {
                this.produtos[index].qntdSaida = null;
            }
        }

        public removerMaterialAdd(servicoItem :ServicoItem) :void {
            this.atualizarMaterialRemovido(servicoItem);
            this.removeListaMaterial(servicoItem);
            
            if(servicoItem.id > 0)
                this.addItemRemovido(servicoItem);

            this.toastr.success("Material removido com sucesso");
        }

        public addItemRemovido(servicoItem :ServicoItem) :void {
            servicoItem.product = null;
            servicoItem.servico = null;
            this.servicoItemsRemovidos.push(servicoItem);
        }

        public atualizarMaterialRemovido(servicoItem :ServicoItem){
           this.produtos.filter((p) => { 
                if(p.id == servicoItem.product.id)
                {
                    this.removerMaterialNovaLista(p);
                    p.quantityOnHand = Number(p.quantityOnHand) + Number(servicoItem.quantity);                   
                }          
           });          
        }

        public removeListaMaterial(servicoItem :ServicoItem) :void {
            var index = this.servicoItems.indexOf(servicoItem);
            if(index > -1)
                this.servicoItems.splice(index,1);
        }

        public removerMaterialNovaLista(produtoABS :ProdutoABS): void {
            var produto = new Produto();
            produto = angular.copy(produtoABS);
            var index = this.produtosAdicionados.map(function(el) {
                    return el.id;
            }).indexOf(produto.id);
            if(index > -1)
                this.produtosAdicionados.splice(index,1);
        }


        public add() :void {
            if(this.adicionarMaterial)
                this.addWithMaterial();
            else
                this.addWithOutMaterial();
        }

        public addWithMaterial(): void {
            if(this.selectedItem.id){
                this.servico.userId = this.selectedItem.id;
                this.servico.user = this.getUser(this.servico.userId);
                if(this.ordemServico != null)
                    this.servico.ordemServicoId = this.ordemServico.id;

                this.servico.servicoItems = this.servicoItems;

                this.toastr.success("Serviço adicionado com sucesso!");  
                this.mdDialog.hide({newServico: this.servico, itemsRemovidos: this.servicoItemsRemovidos});              
            }
            else {
                this.toastr.success("Erro ao Adicionar serviço!");
            }
        }

        public addWithOutMaterial() :void {
            if(this.selectedItem.id){
                this.servico.userId = this.selectedItem.id;
                this.servico.user = this.getUser(this.servico.userId);
                if(this.ordemServico != null)
                    this.servico.ordemServicoId = this.ordemServico.id;

                this.toastr.success("Serviço adicionado com sucesso!");
                this.mdDialog.hide({newServico: this.servico, itemsRemovidos: this.servicoItemsRemovidos});
            }
            else {
                this.toastr.success("Erro ao Adicionar serviço!");
            }
        } 

        public close(): void {
            this.mdDialog.cancel();
        }

        public getUser(id :number) :User {
            var usuario = new User();
            this.usuarios.filter((u) => { if(u.id == id){usuario = u} });
            return usuario;
        }
    
  }


    angular.module(appConfig.appName).controller('ModalServicoController', ModalServicoController);
}