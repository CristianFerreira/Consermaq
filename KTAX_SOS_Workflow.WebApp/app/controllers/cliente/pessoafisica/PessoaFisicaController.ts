/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class PessoaFisicaController {

        static $inject = ['$location', 'ClienteService', 'toastr', '$mdDialog', '$timeout','$rootScope'];

     
        private $location: ILocationService;
        private clienteService: ClienteService;
        public pessoasFisicas: Array<Cliente>;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;
        public selected: Array<any>;
        public limitOptions: Array<any>;
        public options: any;
        public query: any;
        public showCheck: any;
        public promise: any;
        public filterShow: boolean;
        public filterSearch: string;
        public isAdmin: Boolean;

        constructor($location: ILocationService, 
                    clienteService: ClienteService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $rootScope: IRootScope,
                    ) {

            this.$location = $location;
            this.clienteService = clienteService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;
            this.isAdmin = this.$rootScope.sistemaContexo.usuarioLogado.isAdmin;
            this.pessoasFisicas = new Array<Cliente>();
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

            this.loadPessoaFisica();
        }

        public loadPessoaFisica() : void {
           this.clienteService.listAllPF()
                .then((data) => {                 
                    this.pessoasFisicas = data;                               
                })
                .catch((response) => console.log("Não foi possivel carregar as Pessoas Fisicas, erro: " + response));
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


     public modalCreatePessoaFisica (ev: any) : void {
         this.mdDialog.show({
            controller: "ModalPessoaFisicaController",
            templateUrl: 'app/views/cliente/pessoafisica/modal-pessoafisica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pf: () => null
                     }
        }).then( (response) => {
            if(response){
                this.pessoasFisicas.push(response.NewPessoaFisica);
                this.selected = new Array<any>();        
                this.loadStuff();
            }
                
        });
     } 

       public modalEditPessoaFisica (ev: any, pf: Cliente) : void {
        var index = this.pessoasFisicas.indexOf(pf);  
         this.mdDialog.show({
            controller: "ModalPessoaFisicaController",
            templateUrl: 'app/views/cliente/pessoafisica/modal-pessoafisica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pf: ()=> angular.copy(pf)
                     }
        }).then(response => {
                if(response){
                    this.pessoasFisicas[index] = response.UpdatePessoaFisica;
                    this.selected = new Array<any>();        
                    this.loadStuff();
                }

            });
     } 

    public modalDeletePessoaFisica (ev: any, pessoasfisicas: Array<Cliente>) : void {      
         this.mdDialog.show({
           controller: "ModalDeletePessoaFisicaController",
            templateUrl: 'app/views/cliente/pessoafisica/modal-delete-pessoafisica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pessoasfisicas: ()=> pessoasfisicas
                     }
        }).then( (response) => {
            if(response){             
                        pessoasfisicas.forEach(pf => {
                        var index = this.pessoasFisicas.indexOf(pf);
                        this.pessoasFisicas.splice(index,1);
                    }); 
                    this.loadStuff();     
                    this.selected = new Array<any>();                
            }
            
        });
     } 

  }

  

    angular.module(appConfig.appName).controller('PessoaFisicaController', PessoaFisicaController);
}