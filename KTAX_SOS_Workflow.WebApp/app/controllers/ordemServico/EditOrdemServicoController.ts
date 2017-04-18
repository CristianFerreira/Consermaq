/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class EditOrdemServicoController {

        static $inject = ['$location', '$routeParams', 'ClienteService', 'OrdemServicoService', 
                            'toastr', '$timeout','$q','$mdDialog'];

     
        private $location: ILocationService;
        public $routeParams: IRouteParamsService;
        private clienteService: ClienteService;
        private ordemServicoService: OrdemServicoService;
        public toastr: Toastr;     
        public timeout: ITimeoutService;
        public $q: ng.IQService;
        public mdDialog: any;
        public ordemServico: OrdemServico;     
        public clientes: Array<Cliente>;
        public cliente: Cliente;
        public tipoCliente: string;
        public textoCliente: any;
       
   
        public selectedItem : any;
        public searchText   : any;
        

        constructor($location: ILocationService, 
                    $routeParams: IRouteParamsService,
                    clienteService: ClienteService, 
                    ordemServicoService: OrdemServicoService,
                    toastr: Toastr,                  
                    timeout: ITimeoutService,
                    $q: ng.IQService,
                    mdDialog: any) {

            this.$location = $location;
            this.$routeParams = $routeParams;
            this.clienteService = clienteService;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.timeout = timeout;
            this.$q = $q;            
            this.mdDialog = mdDialog;
            this.clientes = new Array<Cliente>();          
            this.ordemServico = new OrdemServico;
           

            this.load();          
        }

        public load (){
            this.loadClientes();
            if (this.$routeParams.id){
                 this.ordemServicoService.getById(this.$routeParams.id)
                 .then((data) => {
                     this.ordemServico = data;
                     this.loadTipoPessoa();
                 })
                 .catch((response) => toastr.error("Não carregou a ordem de serviço, erro: " + response) );
             }          
        }

        public loadTipoPessoa() :void {
            if(this.ordemServico.cliente.cpf)
                this.tipoCliente = 'pf';
            else
                this.tipoCliente = 'pj';

            this.selectedItem = this.ordemServico.cliente;
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
            if(clientePJ.cnpj)
                 return (clientePJ.nome.indexOf(query) === 0);
        }  
              
      };

      public clearSelectItem() {
          this.selectedItem = new Array<any>();
      }

      public abrirModalServico(ev :Event) :void {
            this.mdDialog.show({
            controller: "ModalServicoController",
            templateUrl: 'app/views/ordemServico/modal-servico.html',
            targetEvent: ev,
            clickOutsideToClose: true,
            controllerAs: 'vm',
        }).then( (response) => {
            if(response.newServico){
                this.ordemServico.servicos.push(response.newServico);    
            }          
        });
      } 

      public save() {
        if(this.selectedItem.id){
             this.ordemServico.clienteId = this.selectedItem.id;  
             this.ordemServicoService.save(this.ordemServico)
             .then((data) => {
                    this.ordemServico = data;
                    this.cliente = new Cliente();
                    if(this.loadCliente())
                         this.toastr.success("Ordem de serviço salva com sucesso!");
                    else
                        this.toastr.error("Erro ao buscar dados do cliente!")
             }).catch((response) => { this.toastr.error("Erro ao salvar ordem de serviço!");})
        }
     }

     public loadCliente() :Boolean {
        this.cliente = new Cliente();
        this.clientes.filter((c) => {
            if (c.id == this.ordemServico.clienteId)
                 this.cliente = c;     
        });

        if(this.cliente)
            return true;
        else
            return false;   
    }
    
  }


    angular.module(appConfig.appName).controller('EditOrdemServicoController', EditOrdemServicoController);
}