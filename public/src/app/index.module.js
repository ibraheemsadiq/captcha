(function() {
  'use strict';

  angular
    .module('public', ['ngAnimate', 'md.data.table', 'ngFileUpload', 'ngCookies', 'ngTouch', 'ngSanitize', 'ngMessages', 'ngAria', 'ngResource', 'ngRoute', 'ngMaterial', 'toastr'])
    .service('CaptchaDataService', CaptchaDataService)
    .service('AuthenticationService', AuthenticationService)
    .factory('UserService', UserService)
    .directive('fileModel', ['$parse', function ($parse) {
      return {
        restrict: 'A',
        link: function(scope, element, attrs) {
          var model = $parse(attrs.fileModel);
          var modelSetter = model.assign;

          element.bind('change', function(){
            scope.$apply(function(){
              modelSetter(scope, element[0].files);
            });
          });
        }
      };
    }])

    function AuthenticationService($http, $window, $cookies, $rootScope, $timeout, UserService) {
      var service = {};

      service.Login = Login;
      service.SetCredentials = SetCredentials;
      service.ClearCredentials = ClearCredentials;


      return service;
      // Base64 encoding service used by AuthenticationService

      function Login(username, password, operation, callback) {

        /* Dummy authentication for testing, uses $timeout to simulate api call
         ----------------------------------------------*/
        $timeout(function () {
          var response;
          UserService.GetByUsername(username, password, operation, callback)
            .then(function (user) {
              console.log(user);
              if (user.data !== "" && user.status == '200') {
                response = { success: true };
              } else {
                response = { success: false, message: 'Username or password is incorrect' };
              }
              callback(response);
            });
        }, 1000);

        /* Use this for real authentication
         ----------------------------------------------*/
        //$http.post('/api/authenticate', { username: username, password: password })
        //    .success(function (response) {
        //        callback(response);
        //    });

      }

      function SetCredentials(username, password) {
        var Base64 = {

          keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

          encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
              chr1 = input.charCodeAt(i++);
              chr2 = input.charCodeAt(i++);
              chr3 = input.charCodeAt(i++);

              enc1 = chr1 >> 2;
              enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
              enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
              enc4 = chr3 & 63;

              if (isNaN(chr2)) {
                enc3 = enc4 = 64;
              } else if (isNaN(chr3)) {
                enc4 = 64;
              }

              output = output +
                this.keyStr.charAt(enc1) +
                this.keyStr.charAt(enc2) +
                this.keyStr.charAt(enc3) +
                this.keyStr.charAt(enc4);
              chr1 = chr2 = chr3 = "";
              enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
          },

          decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
              $window.alert("There were invalid base64 characters in the input text.\n" +
                "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
              enc1 = this.keyStr.indexOf(input.charAt(i++));
              enc2 = this.keyStr.indexOf(input.charAt(i++));
              enc3 = this.keyStr.indexOf(input.charAt(i++));
              enc4 = this.keyStr.indexOf(input.charAt(i++));

              chr1 = (enc1 << 2) | (enc2 >> 4);
              chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
              chr3 = ((enc3 & 3) << 6) | enc4;

              output = output + String.fromCharCode(chr1);

              if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
              }
              if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
              }

              chr1 = chr2 = chr3 = "";
              enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
          }}

        var authdata = Base64.encode(username + ':' + password);

        $rootScope.globals = {
          currentUser: {
            username: username,
            authdata: authdata
          }
        };

        // set default auth header for http requests
        $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

        // store user details in globals cookie that keeps user logged in for 1 week (or until they logout)
        var cookieExp = new Date();
        cookieExp.setDate(cookieExp.getDate() + 7);
        $cookies.putObject('globals', $rootScope.globals, { expires: cookieExp });
      }

      function ClearCredentials() {
        $rootScope.globals = {};
        $cookies.remove('globals');
        $http.defaults.headers.common.Authorization = 'Basic';
      }

    }
    function UserService($http) {
      var service = {};

      service.GetAll = GetAll;
      service.GetById = GetById;
      service.GetByUsername = GetByUsername;
      service.Create = Create;
      service.Update = Update;
      service.Delete = Delete;

      return service;

      function GetAll() {
        return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
      }

      function GetById(id) {
        return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
      }

      function GetByUsername(username, password, operation) {

        console.log(username+password);
        return $http({
          url: '/users',
          method: "GET",
          params: {username: username, password: password, operation: operation }
        });

        //return $http.get('', {}).then(handleSuccess, handleError('Error getting user by username and password'));
      }

      function Create(user) {
        return $http.post('/api/users', user).then(handleSuccess, handleError('Error creating user'));
      }

      function Update(user) {
        return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
      }

      function Delete(id) {
        return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
      }

      // private functions

      function handleSuccess(res) {
        return res.data;
      }

      function handleError(error) {
        return function () {
          return { success: false, message: error };
        };
      }
    }
    function CaptchaDataService() {
      var info;

      return {
        getInfo: getInfo,
        setInfo: setInfo
      };

      // .................

      function getInfo() {
        return info;
      }

      function setInfo(value) {
        info = value;
      }
    }









})();
