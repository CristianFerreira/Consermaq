/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class AtivarOrdemServicoController {

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

        public ativarOrdemServico() :void {
            this.ordemServicoService.ativarOrdemServico(this.ordemServico)
            .then((data) => {
                this.mdDialog.hide({ordemServicoAtivada: data});
                this.toastr.success("Ordem de Serviço: "+this.ordemServico.id, "Ordem de Serviço ativada com sucesso!")
            })
            .catch((response) => {
                var toast = this.toastr.error(response.data.errors[0].value,"Não foi possivel Ativar ordem de serviço", {timeOut: 10000})            
                this.close();
            })
        }
  }


    angular.module(appConfig.appName).controller('AtivarOrdemServicoController', AtivarOrdemServicoController);
}