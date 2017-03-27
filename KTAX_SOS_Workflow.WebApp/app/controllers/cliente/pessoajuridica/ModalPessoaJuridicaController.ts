/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalPessoaJuridicaController {

        static $inject = ['PessoaJuridicaService', 'toastr', '$mdDialog', 'pj'];

        public pessoaJuridicaService: PessoaJuridicaService;
        public toastr: Toastr;
        public mdDialog: any;
        public pj: PessoaJuridica;

        constructor(pessoaJuridicaService: PessoaJuridicaService, toastr: Toastr, mdDialog: any, pj: PessoaJuridica) {
            this.pessoaJuridicaService = pessoaJuridicaService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pj = pj;
        }

        public savePessoaJuridica() :void {
            if(!this.pj.id){
                 this.pessoaJuridicaService.savePessoaJuridica(this.pj)
                .then((data) => {                 
                    this.mdDialog.hide({NewPessoaJuridica: data}); 
                    this.toastr.success("Cliente cadastrado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente não pode ser cadastrado!');
                }) 
            }else{
                this.pessoaJuridicaService.editPessoaJuridica(this.pj)
                .then((data) => {                 
                    this.mdDialog.hide({UpdatePessoaJuridica: data}); 
                    this.toastr.success("Cliente Pessoa Juridica editado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente Pessoa Juridica não pode ser editado!');
                })  
            }                 
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalPessoaJuridicaController', ModalPessoaJuridicaController);
}