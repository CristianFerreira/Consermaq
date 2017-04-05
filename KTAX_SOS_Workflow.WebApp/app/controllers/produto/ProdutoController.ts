/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class ProdutoController {

        static $inject = ['$location', 'ProdutoService', 'toastr', '$mdDialog', '$timeout'];

     
        private $location: ILocationService;
        private produtoService: ProdutoService;
        public produtos: Array<Produto>;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public showCheck: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;

        constructor($location: ILocationService, 
                    produtoService: ProdutoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService) {

            this.$location = $location;
            this.produtoService = produtoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.produtos = new Array<Produto>();
            this.selected =  [];
            this.limitOptions = [5, 10, 15];
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
                            limit: 5,
                            page: 1
            };
            this.showCheck = {};

            this.loadProduto();
        }

        public loadProduto() : void {
           this.produtoService.listAll()
                .then((data) => {                 
                    this.produtos = data;                               
                })
                .catch((response) => console.log("Não foi possivel carregar os Produtos, erro: " + response));
        }

        public removeFilter () : void {
        this.filterShow = false;
        this.filterSearch = '';
    };

       public toggleLimitOptions () : any {
             this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
        };

       public loadStuff () : any {
            this.promise = this.timeout(function () {
            // loading
        }, 2000);
    }


     public modalCreateProduto (ev: any) : void {
         this.mdDialog.show({
            controller: "ModalProdutoController",
            templateUrl: 'app/views/produto/modal-produto.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             produto: () => null
                     }
        }).then( (response) => {
            if(response){
                this.produtos.push(response.NewProduto);
                this.selected = new Array<any>();        
                this.loadStuff();
            }
                
        });
     } 

       public modalEditProduto (ev: any, produto: Produto) : void {
        var index = this.produtos.indexOf(produto);  
         this.mdDialog.show({
            controller: "ModalProdutoController",
            templateUrl: 'app/views/produto/modal-produto.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             produto: ()=> angular.copy(produto)
                     }
        }).then(response => {
                if(response){
                    this.produtos[index] = response.UpdateProduto;
                    this.selected = new Array<any>();        
                    this.loadStuff();
                }
            });
     } 

    public modalDeleteProduto (ev: any, produtos: Array<Produto>) : void {      
         this.mdDialog.show({
           controller: "ModalDeleteProdutoController",
            templateUrl: 'app/views/produto/modal-delete-produto.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             produtos: ()=> produtos
                     }
        }).then( (response) => {
            if(response){             
                        produtos.forEach(p => {
                        var index = this.produtos.indexOf(p);
                        this.produtos.splice(index,1);
                    }); 
                    this.loadStuff();     
                    this.selected = new Array<any>();                
            }
            
        });
     } 

  }

  

    angular.module(appConfig.appName).controller('ProdutoController', ProdutoController);
}