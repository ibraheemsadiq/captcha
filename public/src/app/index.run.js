(function() {
  'use strict';

  angular
    .module('public')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $location, $cookies, $http) {

    var change = $rootScope.$on('$locationChangeStart', function () {
      // redirect to login page if not logged in and trying to access a restricted page


      $rootScope.globals = $cookies.getObject('globals') || {};
      if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;

      }
      var restrictedPage = $location.path().indexOf(['/admin', '/']) === -1?ture:false;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
        $location.path('/admin');
      }
    });
    return change;
    $log.debug('runBlock end');
  }

})();
