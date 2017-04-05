/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class NovaOrdemServicoController {

        static $inject = ['$location', 'ClienteService', 'OrdemServicoService', 'toastr', '$mdpDatePicker', '$mdpTimePicker', '$timeout','$q'];

     
        private $location: ILocationService;
        private clienteService: ClienteService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;     
        public $mdpDatePicker: any;
        public $mdpTimePicker: any;
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public clientes: Array<Cliente>;
        public ordemServico: OrdemServico;
       
        
        public selectedItem : any;
        public searchText   : any;
        

        constructor($location: ILocationService, 
                    clienteService: ClienteService, 
                    ordemServicoService: OrdemServicoService,
                    toastr: Toastr,                  
                    $mdpDatePicker: any,
                    $mdpTimePicker: any,
                    timeout: ITimeoutService,
                    $q: ng.IQService) {

            this.$location = $location;
            this.clienteService = clienteService;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.$q = $q;
            this.$mdpDatePicker = $mdpDatePicker;
            this.$mdpTimePicker = $mdpTimePicker;
            this.timeout = timeout;
            this.clientes = new Array<Cliente>();
            this.ordemServico = new OrdemServico;
           

            this.loadClientes();          
        }

        public loadClientes() : void {
           this.clienteService.listAll()
                .then((data) => {                 
                    this.clientes = data; 
                     return this.clientes.map((c) => {
                        c.nome = c.nome.toUpperCase();
                        return c;
                    });                              
                })
                .catch((response) => console.log("Não foi possivel carregar os clientes, erro: " + response));
        }

    public buscarPF (query) :any {
        var results = query ? this.clientes.filter((c) => {return this.filterPF(query,c)} ) : this.clientes.filter((c) => c.cpf != null);
        var deferred = this.$q.defer();
        this.timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
    }

     public filterPF(query, clientePF) :any{
        query = angular.uppercase(query)
        var regex = /^[0-9]/g;    
        if(regex.test(query)){
            if(clientePF.cpf){
                return (clientePF.cpf.indexOf(query) === 0);
            } else {
                return false;
            } 
        }
        else {
             if(clientePF.cpf){
                return (clientePF.nome.indexOf(query) === 0);
            } else {
                return false;
            } 
        }    
    };


      public buscarPJ (query) :any {
        var results = query ? this.clientes.filter((c) => {return this.filterPJ(query,c)} ) : this.clientes.filter((c) => c.cpf == null);
        var deferred = this.$q.defer();
        this.timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
    }

     public filterPJ(query, clientePJ) :any{
        query = angular.uppercase(query)
        var regex = /^[0-9]/g;
        if(regex.test(query)){
             if(clientePJ.cnpj){
                return (clientePJ.cnpj.indexOf(query) === 0);
            } else {
                return false;
            }  
        }
        else {
             return (clientePJ.nome.indexOf(query) === 0);
        }  
              
    };

    public clearSelectItem() {
        this.selectedItem = new Array<any>();
    }

    public save(){
        if(this.selectedItem.id){
             this.ordemServico.clienteId = this.selectedItem.id;  
             this.ordemServicoService.save(this.ordemServico)
             .then((data) => {

             }).catch((response) => {})

        }
        

    }
    

   
  }

  

    angular.module(appConfig.appName).controller('NovaOrdemServicoController', NovaOrdemServicoController);
}