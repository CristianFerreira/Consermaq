

/// <reference path="../../configs/_all.ts" />

module Consermaq {
    export class LoginController {

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
        }

        public login(): void{
            this.autenticacaoService.login(this.loginModel)
                .then((data) => { 
                    this.toastr.success("Seja bem vindo " + this.$rootScope.sistemaContexo.usuarioLogado.email, 
                                "Você está autenticado");
                    this.$location.url("/");
                })
                .catch((response) => {
                    this.toastr.error("Usuário ou senha inválido ", 
                                "Erro ao autenticar");
                });
        }
    }
    angular.module(appConfig.appName).controller('LoginController', LoginController);
}