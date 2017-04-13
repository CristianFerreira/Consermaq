/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class OrdemServicoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', '$timeout'];

     
        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
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
        public ordemServicos: Array<OrdemServico>;
        public buscarPorCNPJouCPF: string;
        public teste:any;

        constructor($location: ILocationService, 
                    ordemServicoService: OrdemServicoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
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

       public toggleLimitOptions () : any {
             this.limitOptions = this.limitOptions ? undefined : [5, 10, 15];
        };

       public loadStuff () : any {
            this.promise = this.timeout(function () {
            // loading
        }, 2000);
    }

     public createOrdemServico() : void {
          this.$location.path("novaOrdemServico");
     } 

     public editOrdemServico (ordemServico: OrdemServico) : void {
        this.$location.path("novaOrdemServico/" + ordemServico.id);
     } 

    public ordenarCPFouCNPJ () : string {
        if(this.buscarPorCNPJouCPF == "cliente.cpf")
        {
            this.buscarPorCNPJouCPF = "cliente.cnpj";
            return "cliente.cnpj";
        }
        else
        {
            this.buscarPorCNPJouCPF = "cliente.cpf";
            return "cliente.cpf";
        }
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