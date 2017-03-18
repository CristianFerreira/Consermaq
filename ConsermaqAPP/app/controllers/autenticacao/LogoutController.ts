

/// <reference path="../../configs/_all.ts" />

module Travel_World {
    export class LogoutController {

        static $inject = ['$routeParams', 
                            '$rootScope', 
                            '$location',
                            'AutenticacaoService',
                            'toastr'];

        private $location: ILocationService;
        private $routeParams: IRouteParamsService;
        private $rootScope: IRootScope;
        private autenticacaoService: AutenticacaoService;
        private loginModel: LoginModel;
        public toastr: Toastr;

        constructor($routeParams: IRouteParamsService, 
                    $rootScope: IRootScope, 
                    $location: ILocationService,
                    autenticacaoService: AutenticacaoService, 
                    toastr: Toastr) {

            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$rootScope = $rootScope;
            this.autenticacaoService = autenticacaoService;
            this.toastr = toastr;
            this.loginModel = new LoginModel();
            this.logout();
        }

        public logout(): void{
            this.autenticacaoService.logout()
            this.toastr.success("Obrigado por usar o sistema Travel World", 
                                "Sessão encerrada");
            this.$location.url("/");
        }
    }
    angular.module(appConfig.appName).controller('LogoutController', LogoutController);
}