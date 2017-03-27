/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class PessoaFisicaController {

        static $inject = ['$location', 'PessoaFisicaService', 'toastr', '$mdDialog', '$timeout'];

     
        private $location: ILocationService;
        private pessoaFisicaService: PessoaFisicaService;
        public pessoasFisicas: Array<PessoaFisica>;
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
                    pessoaFisicaService: PessoaFisicaService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService) {

            this.$location = $location;
            this.pessoaFisicaService = pessoaFisicaService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.pessoasFisicas = new Array<PessoaFisica>();
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
           this.pessoaFisicaService.listAll()
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

       public modalEditPessoaFisica (ev: any, pf: PessoaFisica) : void {
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

    public modalDeletePessoaFisica (ev: any, pessoasfisicas: Array<PessoaFisica>) : void {      
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