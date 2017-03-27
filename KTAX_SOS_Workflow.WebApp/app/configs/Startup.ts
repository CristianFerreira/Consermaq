/// <reference path="_all.ts" />

module Consermaq {
    'use strict';

    function config(cfpLoadingBarProvider: any, $locationProvider: any) {
        // configuracoes da barra de carregamento        
        cfpLoadingBarProvider.includeSpinner = true;
        cfpLoadingBarProvider.includeBar = true;
        cfpLoadingBarProvider.parentSelector = '#loading-bar-container';
        cfpLoadingBarProvider.spinnerTemplate = '<div id="loading-bar-spinner">' +
                                                '   <div style="padding-left: 30px;">' +
  	                                            '       <div class="spinner-icon"></div>' +   
                                                '   </div>' +
                                                '   <div class="spinner-text">Carregando...</div>' +
                                                '</div>';

        $locationProvider.hashPrefix('');
    }
    config.$inject = ['cfpLoadingBarProvider','$locationProvider'];
    angular.module(appConfig.appName).config(config);
    
    function start($rootScope: IRootScope, autenticacaoService: AutenticacaoService) {
        
        autenticacaoService.carregaUsuarioAutenticado();
    }

    
	angular.module(appConfig.appName).config(config);
    
	start.$inject = ['$rootScope', 'AutenticacaoService'];
	angular.module(appConfig.appName).run(start);
}