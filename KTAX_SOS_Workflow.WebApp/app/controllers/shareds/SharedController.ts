

/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class SharedController {

        static $inject = ['$location'];

        private $location: ILocationService;
        
        constructor($location: ILocationService) {
            this.$location = $location;
        }

        public logout(): void{
            this.$location.path("/logout");
        }
    }
    
    angular.module(appConfig.appName).controller('SharedController', SharedController);
}