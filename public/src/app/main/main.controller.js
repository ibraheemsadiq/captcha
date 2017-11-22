(function() {
  'use strict';

  angular
    .module('public')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout,$resource,$window,$log,CaptchaDataService , webDevTec, toastr) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1506416316076;
    vm.showToastr = showToastr;



    vm.generateObjects = function () {
      var data = CaptchaDataService.getInfo();
      generateRandom(data);
    }


    // <!--------------------------------------Generate Random Objects-----------------------------------!>
    function generateRandom(data) {
      vm.data = angular.copy(_.sample(data, 3));
      vm.incorrect = angular.copy(_.sample(data, 1));
      var random = _.sample([0,1,2],1);
      vm.data[random].object = vm.incorrect[0].object;
    }

    vm.getcaptcha = function () {

      var Api = $resource("http://www.capt-cha.site/captcha");
      Api.query({ method: 'GET', isArray: false, operation: 'view' }).$promise.then(function(data) {
        vm.loader = false;
        var limit = Math.floor(($window.innerHeight-400) / 41);
        if(data)
        {

          CaptchaDataService.setInfo(data);
          generateRandom(data);

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



    //<!------------------------------------getting captcha's object------------------------------!>
    vm.getcaptcha();









// Panda Eye move
    $(document).on( "mousemove", function( event ) {
      var dw = $(document).width() / 15;
      var dh = $(document).height() / 15;
      var x = event.pageX/ dw;
      var y = event.pageY/ dh;
      $('.eye-ball').css({
        width : x,
        height : y
      });
    });

// validation


    $('#solve').click(function(){

      if(vm.incorrect[0].object.toLowerCase() == vm.name.toLowerCase())
      {
        vm.alert = 'Great! Correct';
        $('form').addClass('wrong-entry');
        setTimeout(function(){
          $('form').removeClass('wrong-entry');
        },10000 );

      }
      else
      {
        vm.alert = 'Oops! Incorrect';
        $('form').addClass('wrong-entry');
         setTimeout(function(){
           $('form').removeClass('wrong-entry');
         },10000 );

      }


    });
    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
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
