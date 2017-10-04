(function() {
  'use strict';

  angular
    .module('public')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controllerAs: 'MainController'
      })
      .when('/admin', {
        templateUrl: 'app/admin/admin.html',
        controller: 'AdminController'
      })
      .when('/captcha', {
        templateUrl: 'app/captcha/captcha.html',
        controller: 'AdminController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
