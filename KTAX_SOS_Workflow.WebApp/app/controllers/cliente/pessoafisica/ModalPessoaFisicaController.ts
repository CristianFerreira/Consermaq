/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalPessoaFisicaController {

        static $inject = ['PessoaFisicaService', 'toastr', '$mdDialog', 'pf'];

        public pessoaFisicaService: PessoaFisicaService;
        public toastr: Toastr;
        public mdDialog: any;
        public pf: PessoaFisica;

        constructor(pessoaFisicaService: PessoaFisicaService, toastr: Toastr, mdDialog: any, pf: PessoaFisica) {
            this.pessoaFisicaService = pessoaFisicaService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pf = pf;
        }

        public savePessoaFisica() :void {
            if(!this.pf.id){
                 this.pessoaFisicaService.savePessoaFisica(this.pf)
                .then((data) => {                 
                    this.mdDialog.hide({NewPessoaFisica: data}); 
                    this.toastr.success("Cliente cadastrado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente não pode ser cadastrado!');
                }) 
            }else{
                this.pessoaFisicaService.editPessoaFisica(this.pf)
                .then((data) => {                 
                    this.mdDialog.hide({UpdatePessoaFisica: data}); 
                    this.toastr.success("Cliente Pessoa Fisica editado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente Pessoa Fisica não pode ser editado!');
                })  
            }                 
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalPessoaFisicaController', ModalPessoaFisicaController);
}