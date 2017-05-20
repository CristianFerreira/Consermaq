/// <reference path="../../../configs/_all.ts" />

module Consermaq {
    export class VisualizarController {

        static $inject = ['$mdDialog','ordemServico','OrdemServicoService','toastr'];
     
        public mdDialog: any;
        public ordemServico: OrdemServico;     
        private ordemServicoService: OrdemServicoService;
        public toastr :Toastr;
        public clientes: Array<Cliente>;
        public cliente: Cliente;
        public tipoCliente: string;
        public textoCliente: any;
        public selectedItem : any;
        public searchText   : any;
        public selectedUserIndex: any;
        
        constructor(mdDialog: any, ordemServico :OrdemServico, ordemServicoService: OrdemServicoService, toastr :Toastr) {

            this.mdDialog = mdDialog;
            this.ordemServico = ordemServico;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.clientes = new Array<Cliente>();          
            this.selectedUserIndex = undefined;

            this.load();          
        }

        public selectUserIndex (index :any) {
            if (this.selectedUserIndex !== index) {
                    this.selectedUserIndex = index;
            }
            else {
                this.selectedUserIndex = undefined;
            }
        };

        public load (){
                this.loadTipoPessoa();
                this.loadDateFormat();           
        }

        public loadDateFormat() :void {
            if(this.ordemServico.servicos) {
                this.ordemServico.servicos.filter((s)=> {
                    s.inicioServico = new Date(s.inicioServico);
                    s.fimServico = new Date(s.fimServico);
                })
            }
        }

        public loadTipoPessoa() :void {
            if(this.ordemServico.cliente.cpf)
                this.tipoCliente = 'pf';
            else
                this.tipoCliente = 'pj';

            this.selectedItem = this.ordemServico.cliente;
        }

        public close() :void {
            this.mdDialog.cancel();
        }

    }


    angular.module(appConfig.appName).controller('VisualizarController', VisualizarController);
}