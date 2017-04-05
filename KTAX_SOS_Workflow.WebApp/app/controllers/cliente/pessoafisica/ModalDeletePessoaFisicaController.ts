/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalDeletePessoaFisicaController {

        static $inject = ['ClienteService', 'toastr', '$mdDialog', 'pessoasfisicas'];

        public clienteService: ClienteService;
        public toastr: Toastr;
        public mdDialog: any;
        public pessoasfisicas: Array<Cliente>;

        constructor(clienteService: ClienteService, toastr: Toastr, mdDialog: any, pessoasfisicas: Array<Cliente>) {
            this.clienteService = clienteService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pessoasfisicas = pessoasfisicas;
        }

        public delete() :void {   
             this.clienteService.deleteAlot(this.pessoasfisicas)
                .then((data) => {  
                    if(data.length > 1)
                        this.toastr.success("Pessoas Fisicas excluidas com sucesso!"); 
                    else    
                        this.toastr.success("Pessoa Fisica excluida com sucesso!");
             
                    this.mdDialog.hide({pessoasfisicas: data});                                       
                })
                .catch((response) => {
                    this.toastr.error('Pessoa Fisica não pode ser excluida!');
                })      
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalDeletePessoaFisicaController', ModalDeletePessoaFisicaController);
}