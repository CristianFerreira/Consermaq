/// <reference path="../../configs/_all.ts" />
module Consermaq {
    export class ModalUsuarioController {

        static $inject = ['UsuarioService', 'toastr', '$mdDialog', 'usuario', '$rootScope'];

        public usuarioService: UsuarioService;
        public toastr: Toastr;
        public mdDialog: any;
        public usuario: User;
        private $rootScope: IRootScope;
        public validateEmail: any;

        constructor(usuarioService: UsuarioService, toastr: Toastr, mdDialog: any, usuario: User, $rootScope: IRootScope) {
            this.usuarioService = usuarioService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.usuario = usuario;
            this.$rootScope = $rootScope;
            this.validateEmail = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;
        }

        public save() :void {
            if(!this.usuario.id){
                 this.usuarioService.save(this.usuario)
                .then((data) => {                 
                    this.mdDialog.hide({NewUsuario: data}); 
                    this.toastr.success("Usuário cadastrado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Usuário não pode ser cadastrado!');
                }) 
            }else{
                this.usuarioService.edit(this.usuario)
                .then((data) => {                 
                    this.mdDialog.hide({UpdateUsuario: data}); 
                    this.toastr.success("Usuario editado com sucesso!");                          
                })
                .catch((response) => {
                    this.toastr.error('Usuario não pode ser editado!');
                })  
            }                 
        }

        public cancel(): void {
            this.mdDialog.cancel();
        }
    }

    angular.module(appConfig.appName).controller('ModalUsuarioController', ModalUsuarioController);
}