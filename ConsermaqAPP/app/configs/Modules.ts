/// <reference path="_all.ts" />

module Travel_World {
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
    modules.push('cl.paging');
    modules.push('ngSanitize');
    modules.push('froala');
     modules.push('angular-loading-bar');
    modules.push('djds4rce.angular-socialshare');

    angular.module(appConfig.appName, modules).filter('limitHtml', function() {
    return function(text, limit) {

        var changedString = text;
        // var changedString = String(text).replace(/<[^>]+>/gm, '');
        var length = changedString.length;

        return changedString.length > limit ? changedString.substr(0, limit - 1) + "..." : changedString; 
    }
}).filter('unsafe', function($sce) { return $sce.trustAsHtml; }).run(function($FB){
  $FB.init('795149313984725');
}).directive('activeLink', ['$location', function (location) {
    return {
      restrict: 'A',
      link: function(scope, element, attrs, controller) {
        var clazz = attrs.activeLink;
        var path = attrs.href;
        path = path.substring(1); //hack because path does not return including hashbang
        scope.location = location;
        scope.$watch('location.path()', function (newPath) {
          if (path === newPath) {
            element.addClass(clazz);
          } else {
            element.removeClass(clazz);
          }
        });
      }
    };
  }]);
}