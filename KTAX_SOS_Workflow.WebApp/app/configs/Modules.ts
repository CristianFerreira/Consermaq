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
    modules.push('ui.bootstrap');
    modules.push('toastr');
    modules.push('angular-loading-bar');
    modules.push('ui.mask');

    angular.module(appConfig.appName, modules);
}