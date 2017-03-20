/// <reference path="_all.ts" />

module Consermaq {
    'use strict';

    function config($routeProvider: ng.route.IRouteProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "app/views/autenticacao/login.html",
                controller: "LoginController",
                controllerAs: "vm"
            })
            .when("/login", {
                templateUrl: "app/views/autenticacao/login.html",
                controller: "LoginController",
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