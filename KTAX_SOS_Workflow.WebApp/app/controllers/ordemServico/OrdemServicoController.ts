/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class OrdemServicoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', '$timeout','$q'];

     
        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public showCheck: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;
        public ordemServicos: Array<OrdemServico>;
        public buscarPorCNPJouCPF: string;
        public textoCliente: any;
        public cpfClienteFilterCallback: any;
        public cpfClienteTransformer: any;

        constructor($location: ILocationService, 
                    ordemServicoService: OrdemServicoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$q = $q;
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
            this.ordemServicos = new Array<OrdemServico>();
            this.buscarPorCNPJouCPF = "cliente.cpf";
            
            this.cpfClienteFilterCallback = this.CpfClienteFilterCallback;
            this.cpfClienteTransformer = this.CpfClienteTransformer; 
            this.loadOrdemServicos();
        }

        public loadOrdemServicos() : void {
           this.ordemServicoService.listAll()
                .then((data) => {                 
                    this.ordemServicos = data;                             
                })
                .catch((response) => console.log("Não foi possivel carregar os Produtos, erro: " + response));
        }

            public removeFilter () : void {
            this.filterShow = false;
            this.filterSearch = '';
        };
        
        public CpfClienteFilterCallback(names ? :any){
            var arr = this.ordemServicos.filter((item) => 
            {
                return item.cliente.cpf.toLowerCase().indexOf(names.toLowerCase()) !== -1;
            }) 
            return this.$q.resolve(arr);
        }

        public CpfClienteTransformer(ordemServico: any){
            return ordemServico.cliente.cpf;
        }

       public toggleLimitOptions () : any {
             this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
        };

       public loadStuff () : any {
            this.promise = this.timeout(function () {
            // loading
        }, 2000);
    }

     public editOrdemServico(id :number) : void {
        this.$location.path("ordemServico/" + id);
     } 

   public modalCreateOrdemServico (ev: any) : void {
         this.mdDialog.show({
            controller: "ModalOrdemServicoController",
            templateUrl: 'app/views/ordemServico/modal-novaOrdemServico.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
        }).then( (response) => {
            if(response.newOrdemServico){
                this.ordemServicos.push(response.newOrdemServico);
                this.selected = new Array<any>();        
            }
                
        });
     } 

    public modalDeleteProduto (ev: any, ordemServicos: Array<OrdemServico>) : void {      
         this.mdDialog.show({
           controller: "ModalDeleteOrdemServicoController",
            templateUrl: 'app/views/produto/modal-delete-ordem-servico.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             ordemServicos: ()=> ordemServicos
                     }
        }).then( (response) => {
            if(response){             
                        ordemServicos.forEach(o => {
                        var index = this.ordemServicos.indexOf(o);
                        this.ordemServicos.splice(index,1);
                    }); 
                    this.loadStuff();     
                    this.selected = new Array<any>();                
            }          
        });
     } 
  }

  

    angular.module(appConfig.appName).controller('OrdemServicoController', OrdemServicoController);
}