/// <reference path="_all.ts" />

module Travel_World {
    'use strict';

    function config() {
        
    }
    
    function start($rootScope: IRootScope, autenticacaoService: AutenticacaoService) {   
        autenticacaoService.carregaUsuarioAutenticado();
    }

    
	angular.module(appConfig.appName).config(config);
    
	start.$inject = ['$rootScope', 'AutenticacaoService'];
	angular.module(appConfig.appName).run(start);
}