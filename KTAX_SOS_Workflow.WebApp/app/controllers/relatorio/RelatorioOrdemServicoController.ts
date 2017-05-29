/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class RelatorioOrdemServicoController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', '$timeout','$rootScope'];
        
        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public cliente: string;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;

        public numOrdemServico: number;
        public ordemServico: OrdemServico;
   

        constructor($location: ILocationService, 
                    ordemServicoService: OrdemServicoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $rootScope: IRootScope) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;
            this.ordemServico = new OrdemServico();
           
       
        }

        public buscarOrdemServico() :void {
            this.ordemServicoService.getById(this.numOrdemServico)
            .then((data) => {
                this.ordemServico = data;
                this.cliente =  this.ordemServico.cliente.cpf != null ? 
                                this.ordemServico.cliente.nome + " - " + this.ordemServico.cliente.cpf 
                                : this.ordemServico.cliente.nome + " - " + this.ordemServico.cliente.cnpj;
                this.toastr.success("Ordem de Serviço encontrada.")
            })
            .catch((response) => {
                this.toastr.error("Ordem de Serviço não encontrada.")
            })
        }

         
  }

  angular.module(appConfig.appName).controller('RelatorioOrdemServicoController', RelatorioOrdemServicoController);
}