/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class SideBarController {

        static $inject = ['$mdDialog','CityService','PostService','$location','$mdMenu'];

      
        public $mdDialog: any;
        private $location: ILocationService;
        public $mdMenu: any;
        public currentNavItem: string;
        public originatorEv: any;

        constructor($mdDialog: any, $location: ILocationService,$mdMenu: any) {        
                this.$mdDialog = $mdDialog;
                this.$location = $location;
                this.$mdMenu = $mdMenu;

        }

       

        public openMenu($mdOpenMenu: any, ev: any) :void{
            this.originatorEv = ev;
            $mdOpenMenu(ev);
        };

        public getClass(path :any): any{
             return (this.$location.path().substr(0, path.length) === path) ? 'active' : '';
        }

        public closeMenu($mdMenu: any, ev: any) :void{
            this.originatorEv = ev;
            $mdMenu.hide();
        };

        public home() :void {
            this.$location.path("/");
        }

        public categorias() : void {
            this.$location.path("/categorias");
        }

        public continentes() : void {
            this.$location.path("/continentes");
        }

        public paises() : void {
            this.$location.path("/paises");
        }

        public cidades() : void {
            this.$location.path("/cidades");
        }

        public postagem() : void {
            this.$location.path("/postagem");
        }

        public logout(): void{
            this.$location.path("/logout");
        }
       
    }

    angular.module(appConfig.appName).controller('SideBarController', SideBarController).config(function($mdThemingProvider) {
               $mdThemingProvider.theme('customTheme') 
                  .primaryPalette('grey')
                  .accentPalette('orange')
                  .warnPalette('red');
               });

   
}