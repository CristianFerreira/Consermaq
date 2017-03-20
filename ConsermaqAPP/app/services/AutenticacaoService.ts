
/// <reference path="../configs/_all.ts" />

module Consermaq {

    export class AutenticacaoService extends AppServiceBase {

        static $inject = ['$routeParams', 
                            '$rootScope', 
                            '$location',
                            '$http'];

        private $rootScope: IRootScope;
        private $location: ILocationService;
        private $routeParams: IRouteParamsService;
        private $http: IHttpService;
        
        constructor($routeParams: IRouteParamsService, 
                    $rootScope: IRootScope, 
                    $location: ILocationService,
                    $http: IHttpService) {
            super($rootScope, $http);
            this.$routeParams = $routeParams;
            this.$location = $location;
            this.$http = $http;
        }

        public login(loginModel: LoginModel): any{
             var result: ng.IPromise<any>; 
             result = this.autenticacao(loginModel)
                    .then((response: any): ng.IPromise<any> => {
                        return this.setAutenticacao(response);
                    });
            return result;
        }

        public logout(): void{
            this.rootScope.token = null;
            this.rootScope.sistemaContexo = null;

            sessionStorage.removeItem(appConfig.auth_token);
            sessionStorage.removeItem(appConfig.auth_sistema_contexto);

            this.refreshHeader();
        }

        public carregaUsuarioAutenticado(): void{
            this.rootScope.token = sessionStorage.getItem(appConfig.auth_token);
            if(this.rootScope.token){
                this.rootScope.sistemaContexo = angular.fromJson(sessionStorage
                                                                .getItem(appConfig.auth_sistema_contexto));
            
                this.refreshHeader();
                this.$location.path('/');
            }

            // caso nao esteja logado volta para o login
            this.rootScope.$on("$routeChangeStart", 
                (event, next, current) => {
                    if (this.rootScope.token == null) {
                        this.$location.path('/login');
                    }
            });
        }

        private autenticacao(login: LoginModel): any {
            var dt = "grant_type=password" + "&username=" + login.email + "&password=" + login.password;
            var header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } };
            return super.postFromUrl(appConfig.serviceUrls().autenticacao.sistema, dt, header);
        }

        private setAutenticacao(response: any): any {
            sessionStorage.setItem(appConfig.auth_token,  response.access_token);
            sessionStorage.setItem(appConfig.auth_sistema_contexto, response.sistema_contexto);

            this.carregaUsuarioAutenticado();
            return response;
        }

        private refreshHeader(){
            this.rootScope.header = {};
            if(this.rootScope.token && this.rootScope.sistemaContexo){
                this.rootScope.header = {
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Authorization': 'Bearer ' + this.rootScope.token
                    }
                };
            }
        }
    }

    angular.module(appConfig.appName).service("AutenticacaoService", AutenticacaoService);
}