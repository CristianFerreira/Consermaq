/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalDeletePessoaFisicaController {

        static $inject = ['PessoaFisicaService', 'toastr', '$mdDialog', 'pessoasfisicas'];

        public pessoaFisicaService: PessoaFisicaService;
        public toastr: Toastr;
        public mdDialog: any;
        public pessoasfisicas: Array<PessoaFisica>;

        constructor(pessoaFisicaService: PessoaFisicaService, toastr: Toastr, mdDialog: any, pessoasfisicas: Array<PessoaFisica>) {
            this.pessoaFisicaService = pessoaFisicaService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pessoasfisicas = pessoasfisicas;
        }

        public delete() :void {   
             this.pessoaFisicaService.deletePessoaFisicaAlot(this.pessoasfisicas)
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