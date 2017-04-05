/// <reference path="_all.ts" />

module Consermaq {
    'use strict';

    function config($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/cliente/pessoafisica/pessoafisica.html",
                controller: "PessoaFisicaController",
                controllerAs: "vm"
            })
            .when("/login", {
                templateUrl: "app/views/autenticacao/login.html",
                controller: "LoginController",
                controllerAs: "vm"
            })
            .when("/pessoafisica", {
                templateUrl: "app/views/cliente/pessoafisica/pessoafisica.html",
                controller: "PessoaFisicaController",
                controllerAs: "vm"
            })
            .when("/pessoajuridica", {
                templateUrl: "app/views/cliente/pessoajuridica/pessoajuridica.html",
                controller: "PessoaJuridicaController",
                controllerAs: "vm"
            })
             .when("/produtos", {
                templateUrl: "app/views/produto/produto.html",
                controller: "ProdutoController",
                controllerAs: "vm"
            })
            .when("/novaOrdemServico", {
                templateUrl: "app/views/ordemServico/novaOrdemServico.html",
                controller: "NovaOrdemServicoController",
                controllerAs: "vm"
            })
            .when("/logout", {
                templateUrl: "app/views/autenticacao/login.html",
                controller: "LogoutController",
                controllerAs: "vm"
            })
            .otherwise({
                templateUrl: "app/views/shared/404.html",
                controller: "SharedController",
                controllerAs: "vm"
            });;
    }

    config.$inject = ['$routeProvider'];

    angular.module(appConfig.appName).config(config);
}