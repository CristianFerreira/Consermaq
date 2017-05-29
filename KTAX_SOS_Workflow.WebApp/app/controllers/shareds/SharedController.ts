

/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class SharedController {

        static $inject = ['$location','$mdDialog'];

        private $location: ILocationService;
        public mdDialog: any;
        public teste :any;
        
        constructor($location: ILocationService, mdDialog: any) {
            this.$location = $location;
            this.mdDialog = mdDialog;
        }

        public modalConfigurarUsuario (ev: any, user: User) : void {
                this.mdDialog.show({
                    controller: "ModalConfiguracaoUsuarioController",
                    templateUrl: 'app/views/shared/modal-configuracao-usuario.html',
                    targetEvent: ev,
                    clickOutsideToClose: true,
                    controllerAs: 'vm',
                    resolve: {
                                    usuario: () => user
                            }
                }).then( (response) => {
                });
        } 
 
    
        
        public logout(): void{
                this.$location.path("/logout");
        }
    
        
    }
    angular.module(appConfig.appName).controller('SharedController', SharedController);
}