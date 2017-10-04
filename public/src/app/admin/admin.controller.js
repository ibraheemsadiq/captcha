(function() {
  'use strict';

  angular
    .module('public')
    .controller('AdminController', AdminController);

  /** @ngInject */
  function AdminController($timeout, webDevTec, toastr, $location, AuthenticationService) {
    var vm = this;

    vm.submit = function () {
      AuthenticationService.Login(vm.formData.email, vm.formData.password, 'view',function (response) {

        console.log(response);

        if (response.success) {
          AuthenticationService.SetCredentials(vm.username, vm.password);
          $location.path('/captcha');
        } else {
          //FlashService.Error(response.message);
          vm.dataLoading = false;
        }
      });
    }


    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
