/// <reference path="../../../configs/_all.ts" />
module Consermaq {
    export class ModalDeletePessoaJuridicaController {

        static $inject = ['PessoaJuridicaService', 'toastr', '$mdDialog', 'pessoasJuridicas'];

        public pessoaJuridicaService: PessoaJuridicaService;
        public toastr: Toastr;
        public mdDialog: any;
        public pessoasjuridicas: Array<PessoaJuridica>;

        constructor(pessoaJuridicaService: PessoaJuridicaService, toastr: Toastr, mdDialog: any, pessoasjuridicas: Array<PessoaJuridica>) {
            this.pessoaJuridicaService = pessoaJuridicaService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.pessoasjuridicas = pessoasjuridicas;
        }

        public delete() :void {   
             this.pessoaJuridicaService.deletePessoaJuridicaAlot(this.pessoasjuridicas)
                .then((data) => {  
                    if(data.length > 1)
                        this.toastr.success("Pessoas Juridicas excluidas com sucesso!"); 
                    else    
                        this.toastr.success("Pessoa Juridica excluida com sucesso!");
             
                    this.mdDialog.hide({pessoasjuridicas: data});                                       
                })
                .catch((response) => {
                    this.toastr.error('Pessoa Juridica não pode ser excluida!');
                })      
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalDeletePessoaJuridicaController', ModalDeletePessoaJuridicaController);
}