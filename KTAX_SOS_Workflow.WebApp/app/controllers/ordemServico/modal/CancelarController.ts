/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class CancelarController {

        static $inject = ['ordemServico','$mdDialog','OrdemServicoService','toastr'];

        public ordemServico :OrdemServico;
        public mdDialog: any;
        public ordemServicoService :OrdemServicoService;
        public toastr :Toastr;

        constructor(ordemServico :OrdemServico, mdDialog :any, ordemServicoService :OrdemServicoService, toastr :Toastr) {
          this.ordemServico = ordemServico;        
          this.mdDialog = mdDialog;
          this.ordemServicoService = ordemServicoService;
          this.toastr = toastr;
        }

        public close(){
            this.mdDialog.cancel();
        }

        public cancelar() :void {
            this.ordemServicoService.cancelar(this.ordemServico)
            .then((data) => {
                this.mdDialog.hide({ordemServicoCancelada: data});
                this.toastr.success("Ordem de Serviço: "+this.ordemServico.id, "Cancelada com sucesso!")
            })
            .catch((response) => {this.toastr.error("Erro ao cancelar ordem de serviço: "+response)})
        }
  }


    angular.module(appConfig.appName).controller('CancelarController', CancelarController);
}