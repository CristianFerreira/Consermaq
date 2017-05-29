/// <reference path="_all.ts" />

module Consermaq {
    'use strict';

    var modules = new Array<string>();
    modules.push('ngRoute');
    modules.push('ngTouch');
    modules.push('ngAnimate');
    modules.push('ngMessages');
    modules.push('ngMaterial');
    modules.push('md.data.table');
    modules.push('mdDataTable');
    modules.push('ngMdIcons');
    modules.push('ngSanitize');
    modules.push('ui.bootstrap');
    modules.push('toastr');
    modules.push('angular-loading-bar');
    modules.push('ui.mask');
    modules.push('ng-currency');
    modules.push('ngPrint');
    modules.push('mdPickers');
    modules.push('ui.utils.masks');
    modules.push('idf.br-filters');
    modules.push('validation.match');

    modules.push('ui.grid');
    modules.push('ui.grid.treeView');
    modules.push('ui.grid.selection');
    modules.push('ui.grid.autoResize');
    modules.push('ui.grid.exporter');
    
   

    angular.module(appConfig.appName, modules);
}