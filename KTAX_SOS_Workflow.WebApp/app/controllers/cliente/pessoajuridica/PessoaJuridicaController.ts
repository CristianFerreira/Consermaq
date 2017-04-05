/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class PessoaJuridicaController {

        static $inject = ['$location', 'ClienteService', 'toastr', '$mdDialog', '$timeout'];

     
        private $location: ILocationService;
        private clienteService: ClienteService;
        public pessoasJuridicas: Array<Cliente>;
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
                    clienteService: ClienteService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService) {

            this.$location = $location;
            this.clienteService = clienteService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.pessoasJuridicas = new Array<Cliente>();
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

            this.loadPessoaJuridica();
        }

        public loadPessoaJuridica() : void {
           this.clienteService.listAllPJ()
                .then((data) => {                 
                    this.pessoasJuridicas = data;                               
                })
                .catch((response) => console.log("Não foi possivel carregar as Pessoas Juridicas, erro: " + response));
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


     public modalCreatePessoaJuridica (ev: any) : void {
         this.mdDialog.show({
            controller: "ModalPessoaJuridicaController",
            templateUrl: 'app/views/cliente/pessoajuridica/modal-pessoajuridica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pj: () => null
                     }
        }).then( (response) => {
            if(response){
                this.pessoasJuridicas.push(response.NewPessoaJuridica);
                this.selected = new Array<any>();        
                this.loadStuff();
            }
                
        });
     } 

       public modalEditPessoaJuridica (ev: any, pj: Cliente) : void {
        var index = this.pessoasJuridicas.indexOf(pj);  
         this.mdDialog.show({
            controller: "ModalPessoaJuridicaController",
            templateUrl: 'app/views/cliente/pessoajuridica/modal-pessoajuridica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pj: ()=> angular.copy(pj)
                     }
        }).then(response => {
                if(response){
                    this.pessoasJuridicas[index] = response.UpdatePessoaJuridica;
                    this.selected = new Array<any>();        
                    this.loadStuff();
                }

            });
     } 

    public modalDeletePessoaJuridica (ev: any, pessoasJuridicas: Array<Cliente>) : void {      
         this.mdDialog.show({
           controller: "ModalDeletePessoaJuridicaController",
            templateUrl: 'app/views/cliente/pessoajuridica/modal-delete-pessoajuridica.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
            resolve: {
                             pessoasJuridicas: ()=> pessoasJuridicas
                     }
        }).then( (response) => {
            if(response){             
                        pessoasJuridicas.forEach(pj => {
                        var index = this.pessoasJuridicas.indexOf(pj);
                        this.pessoasJuridicas.splice(index,1);
                    }); 
                    this.loadStuff();     
                    this.selected = new Array<any>();                
            }
            
        });
     } 

  }

    angular.module(appConfig.appName).controller('PessoaJuridicaController', PessoaJuridicaController);
}