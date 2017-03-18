/// <reference path="_all.ts" />

module Travel_World {
    'use strict';

    function config($routeProvider: ng.route.IRouteProvider, $locationProvider: ng.ILocationProvider) {

        $locationProvider.html5Mode(true).hashPrefix('!'); 

        $routeProvider
            .when("/", {
                templateUrl: "app/views/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
             .when("/postagens/:categoria", {
                templateUrl: "app/views/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
            .when("/postagens/cidade/:city", {
                templateUrl: "app/views/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
            .when("/postagem/:id", {
                templateUrl: "app/views/home.html",
                controller: "HomeController",
                controllerAs: "vm"
            })
            .when("/categorias", {
                templateUrl: "app/views/categoria/categorias.html",
                controller: "CategoryController",
                controllerAs: "vm"	
            })
            .when("/continentes", {
                templateUrl: "app/views/continent/continents.html",
                controller: "ContinentController",
                controllerAs: "vm"	
            })
            .when("/paises", {
                templateUrl: "app/views/country/countries.html",
                controller: "CountryController",
                controllerAs: "vm"	
            })
            .when("/cidades", {
                templateUrl: "app/views/city/cities.html",
                controller: "CityController",
                controllerAs: "vm"	
            })
            .when("/postagem", {
                templateUrl: "app/views/post/posts.html",
                controller: "PostController",
                controllerAs: "vm"	
            })
            .when("/postagem/edit/:id", {
                templateUrl: "app/views/post/posts.html",
                controller: "PostController",
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
            });
    }

    config.$inject = ['$routeProvider','$locationProvider'];

    angular.module(appConfig.appName).config(config);
}