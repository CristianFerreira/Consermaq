/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ModalConfiguracaoUsuarioController {

        static $inject = ['UsuarioService', 'toastr', '$mdDialog', 'usuario', '$rootScope'];

        public usuarioService: UsuarioService;
        public toastr: Toastr;
        public mdDialog: any;
        public usuario: User;
        private $rootScope: IRootScope;
        public validateEmail: any;
        public senhaAtual: string;
        public novaSenha: string;
        public senhaRepetida: string;
        public alterarSenha: Boolean;

        constructor(usuarioService: UsuarioService, toastr: Toastr, mdDialog: any, usuario: User, $rootScope: IRootScope) {
            this.usuarioService = usuarioService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.usuario = usuario;
            this.$rootScope = $rootScope;
            this.validateEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        }

        public limparCamposAlterarSenha(){
            this.senhaAtual = '';
            this.novaSenha = '';
            this.senhaRepetida = '';
        }

        public edit() :void {
                if(this.alterarSenha)
                    this.usuario.password = this.novaSenha;

                this.usuarioService.edit(this.usuario)
                .then((data) => {  
                    this.$rootScope.sistemaContexo.usuarioLogado.password = data.password;               
                    this.mdDialog.hide(); 
                    this.toastr.success("Alterações efetuadas com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Não pode ser efetuado as modificações!');
                })                 
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }

        
    }

    angular.module(appConfig.appName).controller('ModalConfiguracaoUsuarioController', ModalConfiguracaoUsuarioController);
}