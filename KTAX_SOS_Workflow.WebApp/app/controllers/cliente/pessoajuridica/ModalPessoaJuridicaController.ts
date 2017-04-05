/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalPessoaJuridicaController {

        static $inject = ['ClienteService', 'toastr', '$mdDialog', 'pj'];

        public clienteService: ClienteService;
        public toastr: Toastr;
        public mdDialog: any;
        public pj: Cliente;

        constructor(clienteService: ClienteService, toastr: Toastr, mdDialog: any, pj: Cliente) {
            this.clienteService = clienteService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pj = pj;
        }

        public savePessoaJuridica() :void {
            if(!this.pj.id){
                 this.clienteService.save(this.pj)
                .then((data) => {                 
                    this.mdDialog.hide({NewPessoaJuridica: data}); 
                    this.toastr.success("Cliente cadastrado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Cliente não pode ser cadastrado!');
                }) 
            }else{
                this.clienteService.edit(this.pj)
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