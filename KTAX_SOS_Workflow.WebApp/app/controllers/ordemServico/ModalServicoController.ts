/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class ModalServicoController {

        static $inject = ['OrdemServicoService', 'UsuarioService', 'ProdutoService','ServicoService', 
                            'toastr', '$mdDialog', '$timeout', '$q','ordemServico'];

     
        private ordemServicoService: OrdemServicoService;
        private usuarioService: UsuarioService;
        private produtoService: ProdutoService;
        private servicoService: ServicoService;
        public toastr: Toastr;     
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public ordemServico: OrdemServico;
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

        constructor(ordemServicoService: OrdemServicoService, usuarioService: UsuarioService, 
                    produtoService: ProdutoService,
                    servicoService: ServicoService,
                    toastr: Toastr,                  
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService,
                    ordemServico: OrdemServico) {

            this.ordemServicoService = ordemServicoService;
            this.usuarioService = usuarioService;
            this.produtoService = produtoService;
            this.servicoService = servicoService;
            this.toastr = toastr;       
            this.mdDialog = mdDialog; 
            this.timeout = timeout;
            this.$q = $q;         
            this.ordemServico = ordemServico;     
            this.servico = new Servico();
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

            this.dataMinCalendarioInicioServico = new Date();
            this.dataMinCalendarioInicioServico.setDate(- 60);
            this.dataMaxCalendarioInicioServico = new Date();
            this.load();          
        }

        public load (){
            this.loadUser();
            this.loadProduto();
        }

        public loadProduto() :void {
           this.produtoService.listAll()
                .then((data) => {                 
                    this.produtos = data;                               
                })
                .catch((response) => console.log("Não foi possivel carregar os Produtos, erro: " + response));
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


        public save() :void {
            if(this.adicionarMaterial)
                this.saveWithMaterial();
            else
                this.saveWithOutMaterial();
        }

        public saveWithMaterial(): void {
            if(this.selectedItem.id){
                this.servico.userId = this.selectedItem.id;
                this.servico.ordemServicoId = this.ordemServico.id;
                this.servico.servicoItems = this.servicoItems;
                
                this.servicoService.save(this.servico)
                .then((data) => {
                    console.log("feito")
                })
                .catch((response) => { console.log("Erro")});

            }
        }

        public saveWithOutMaterial() :void {

        } 

        public close(): void {
            this.mdDialog.cancel();
        }
    
  }


    angular.module(appConfig.appName).controller('ModalServicoController', ModalServicoController);
}