(function() {
  'use strict';

  angular
    .module('public')
    .controller('CaptchaController', CaptchaController)
    .controller('editCaptchaController', editCaptchaController);
  function CaptchaController($timeout,Upload, $log,$mdDialog,$scope, $window, $resource, $location, CaptchaDataService, webDevTec, toastr) {
    var vm = this;
    vm.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: DialogController,
        templateUrl: 'dialog.tmpl.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: true,
        fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
      })
        .then(function (answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
          $scope.status = 'You cancelled the dialog.';
        });
    }

    function DialogController($scope, $mdDialog) {
      $scope.hide = function() {
        $mdDialog.hide();
      };
      $scope.cancel = function() {
        $mdDialog.cancel();
      };
      $scope.submit = function() {
        if ($scope.file) {
          $scope.upload($scope.file);
        }
      };

      // upload on file select or drop
      $scope.upload = function (file) {
        Upload.upload({
          url: 'http://www.localhost:3000/captcha/upload',
          data: {file: file, object: $scope.name}
        }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

          if(resp.data == "ok")
          {
            $mdDialog.hide();
            vm.getcaptcha();
          }

          }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      };
    }

    vm.goConfig = function (operation, index) {
      if(operation == 'add')
        $state.go('editCaptcha', {operation: 'add'} );
      if(operation == 'edit')
        $state.go('editCaptcha', {operation: 'edit' , id: index} );
      if(operation == 'view')
        $state.go('editCaptcha', {operation: 'view' , id: index} );

    }

    vm.delData = function (id) {
      var result = confirm("Want to delete?");
      if (result) {

        vm.loader = true;

        var Api = $resource('/captcha');

        Api.get({operation: 'del', id: id}).$promise.then(function(data) {
          vm.loader = false;
          console.log(data);
          if(data)
            vm.getcaptcha();
          }, function(errResponse) {
          if(errResponse)
            $state.go('error');

          // fail
          //console.log(errResponse);
        });

      }

    }
    vm.getcaptcha = function () {

      var Api = $resource("/captcha");
      Api.query({ method: 'GET', isArray: false, operation: 'view' }).$promise.then(function(data) {
        vm.loader = false;
        var limit = Math.floor(($window.innerHeight-400) / 41);
       if(data)
        {
          console.log('data is');
          $log.debug(data);
          vm.data = data;
          CaptchaDataService.setInfo(data);

        }
      }, function(errResponse) {
        if(errResponse)
          $state.go('error');
        //console.log('error');
        //console.log(errResponse);

        // fail
        //console.log(errResponse);
      });

    }

    vm.getcaptcha();


  }

  function editCaptchaController($state, $log, $resource, CaptchaDataService) {
    var vm = this;
    vm.cid = null; // for add operation

    vm.operation = $state.params.operation;

    if(vm.operation == 'edit' || vm.operation == 'view' )
    {
      if(CaptchaDataService.getInfo() == undefined)
        $state.go('Captcha');
      else
      {
        var Captcha = CaptchaDataService.getInfo()[$state.params.id-1];
        vm.data = Captcha;

      }
    }


    vm.configCaptcha = function (operation) {

      vm.loader = true;

      var Api = $resource('/captcha');

      Api.get({operation: operation, data: vm.data}).$promise.then(function(data) {
        vm.loader = false;
        if(data)
          $state.go('Captcha');
      }, function(errResponse) {
        if(errResponse)
          $state.go('error');

        // fail
        // console.log(errResponse);
      });

    }
    //console.log("data is here");
    //console.log($state.paravm.operation);
    //console.log(CaptchaDataService.getInfo());

  }




})();
