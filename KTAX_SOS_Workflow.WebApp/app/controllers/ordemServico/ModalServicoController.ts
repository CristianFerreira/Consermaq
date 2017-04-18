/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class ModalServicoController {

        static $inject = ['OrdemServicoService', 'UsuarioService', 'ProdutoService', 
                            'toastr', '$mdDialog', '$timeout', '$q'];

     
        private ordemServicoService: OrdemServicoService;
        private usuarioService: UsuarioService;
        private produtoService: ProdutoService;
        public toastr: Toastr;     
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
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
        public qntdSaida: number;

        constructor(ordemServicoService: OrdemServicoService, usuarioService: UsuarioService, produtoService: ProdutoService,
                    toastr: Toastr,                  
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService) {

            this.ordemServicoService = ordemServicoService;
            this.usuarioService = usuarioService;
            this.produtoService = produtoService;
            this.toastr = toastr;       
            this.mdDialog = mdDialog; 
            this.timeout = timeout;
            this.$q = $q;              
            this.servico = new Servico;
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
            this.servicoItems = new Array<ServicoItem>();
            this.produtosAdicionados = new Array<Produto>();
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
            if(produto.quantityOnHand - produto.qntdSaida >= 0){
                this.atualizaMaterial(produto);
                this.adicionaListaMaterial(produto);
            }

        }

        public adicionaListaMaterial(produto :ProdutoABS) :void {
             var servicoItem = new ServicoItem();
             servicoItem.productId = produto.id;
             servicoItem.product = produto;
             servicoItem.quantity = produto.qntdSaida;

             this.servicoItems.push(servicoItem);
        }

        public atualizaMaterial(produto:ProdutoABS) : void{
            var index = this.produtos.indexOf(produto);
            if(index > -1) {
                this.produtos[index].quantityOnHand = this.produtos[index].quantityOnHand - produto.qntdSaida;
                this.addMaterialNovaLista(this.produtos[index]);
            }
        }

        public addMaterialNovaLista(produto: ProdutoABS) :void {
             this.produtosAdicionados.push(produto);
        }

    // public close(): void {
    //     if(this.ordemServico.id)
    //         this.mdDialog.hide({newOrdemServico: this.ordemServico}); 
    //     else
    //         this.mdDialog.cancel();      
    // }
    
  }


    angular.module(appConfig.appName).controller('ModalServicoController', ModalServicoController);
}