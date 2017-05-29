/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class RelatorioController {

        static $inject = ['$location', 'OrdemServicoService', 'toastr', '$mdDialog', '$timeout','$rootScope'];
        
        private $location: ILocationService;
        private ordemServicoService: OrdemServicoService;
        public cliente: string;
        public toastr: Toastr;
        public mdDialog: any;
        public timeout: ITimeoutService;
        private $rootScope: IRootScope;

       public selectedIndex: any;
       public next: any;
       public previous: any;
   

        constructor($location: ILocationService, 
                    ordemServicoService: OrdemServicoService, 
                    toastr: Toastr,
                    mdDialog: any,
                    timeout: ITimeoutService,
                    $rootScope: IRootScope) {

            this.$location = $location;
            this.ordemServicoService = ordemServicoService;
            this.toastr = toastr;
            this.mdDialog = mdDialog;
            this.timeout = timeout;
            this.$rootScope = $rootScope;

           
           this.loadTabs();

            this.next = function() {
                this.selectedIndex = Math.min(this.selectedIndex + 1, 2) ;
             };
            this.previous = function() {
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
             };
             this.$rootScope.$watch('this.selectedIndex', function(newValue, oldValue) {
    console.log('ttt');
});
             this.escutar();
        }

        public loadTabs() :void {
            this.selectedIndex = 0;
        }

        public escutar() :void {
            this.$rootScope.$watch('this.selectedIndex', function(newValue, oldValue) {
    console.log('tew');
});
        }
         
  }

  angular.module(appConfig.appName).controller('RelatorioController', RelatorioController);
}