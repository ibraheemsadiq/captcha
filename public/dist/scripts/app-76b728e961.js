!function(){"use strict";function t(t,e,o,a,n,i){function r(t,e,o,a){n(function(){var n;i.GetByUsername(t,e,o,a).then(function(t){console.log(t),n=""!==t.data&&"200"==t.status?{success:!0}:{success:!1,message:"Username or password is incorrect"},a(n)})},1e3)}function l(n,i){var r={keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(t){var e,o,a,n,i,r="",l="",s="",c=0;do e=t.charCodeAt(c++),o=t.charCodeAt(c++),l=t.charCodeAt(c++),a=e>>2,n=(3&e)<<4|o>>4,i=(15&o)<<2|l>>6,s=63&l,isNaN(o)?i=s=64:isNaN(l)&&(s=64),r=r+this.keyStr.charAt(a)+this.keyStr.charAt(n)+this.keyStr.charAt(i)+this.keyStr.charAt(s),e=o=l="",a=n=i=s="";while(c<t.length);return r},decode:function(t){var o,a,n,i,r,l="",s="",c="",d=0,u=/[^A-Za-z0-9\+\/\=]/g;u.exec(t)&&e.alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding."),t=t.replace(/[^A-Za-z0-9\+\/\=]/g,"");do n=this.keyStr.indexOf(t.charAt(d++)),i=this.keyStr.indexOf(t.charAt(d++)),r=this.keyStr.indexOf(t.charAt(d++)),c=this.keyStr.indexOf(t.charAt(d++)),o=n<<2|i>>4,a=(15&i)<<4|r>>2,s=(3&r)<<6|c,l+=String.fromCharCode(o),64!=r&&(l+=String.fromCharCode(a)),64!=c&&(l+=String.fromCharCode(s)),o=a=s="",n=i=r=c="";while(d<t.length);return l}},l=r.encode(n+":"+i);a.globals={currentUser:{username:n,authdata:l}},t.defaults.headers.common.Authorization="Basic "+l;var s=new Date;s.setDate(s.getDate()+7),o.putObject("globals",a.globals,{expires:s})}function s(){a.globals={},o.remove("globals"),t.defaults.headers.common.Authorization="Basic"}var c={};return c.Login=r,c.SetCredentials=l,c.ClearCredentials=s,c}function e(t){function e(){return t.get("/api/users").then(l,s("Error getting all users"))}function o(e){return t.get("/api/users/"+e).then(l,s("Error getting user by id"))}function a(e,o,a){return console.log(e+o),t({url:"/users",method:"GET",params:{username:e,password:o,operation:a}})}function n(e){return t.post("/api/users",e).then(l,s("Error creating user"))}function i(e){return t.put("/api/users/"+e.id,e).then(l,s("Error updating user"))}function r(e){return t["delete"]("/api/users/"+e).then(l,s("Error deleting user"))}function l(t){return t.data}function s(t){return function(){return{success:!1,message:t}}}var c={};return c.GetAll=e,c.GetById=o,c.GetByUsername=a,c.Create=n,c.Update=i,c.Delete=r,c}function o(){function t(){return o}function e(t){o=t}var o;return{getInfo:t,setInfo:e}}t.$inject=["$http","$window","$cookies","$rootScope","$timeout","UserService"],e.$inject=["$http"],angular.module("public",["ngAnimate","md.data.table","ngFileUpload","ngCookies","ngTouch","ngSanitize","ngMessages","ngAria","ngResource","ngRoute","ngMaterial","toastr"]).service("CaptchaDataService",o).service("AuthenticationService",t).factory("UserService",e).directive("fileModel",["$parse",function(t){return{restrict:"A",link:function(e,o,a){var n=t(a.fileModel),i=n.assign;o.bind("change",function(){e.$apply(function(){i(e,o[0].files)})})}}}])}(),function(){"use strict";function t(){function t(){return e}var e=[{title:"AngularJS",url:"https://angularjs.org/",description:"HTML enhanced for web apps!",logo:"angular.png"},{title:"BrowserSync",url:"http://browsersync.io/",description:"Time-saving synchronised browser testing.",logo:"browsersync.png"},{title:"GulpJS",url:"http://gulpjs.com/",description:"The streaming build system.",logo:"gulp.png"},{title:"Jasmine",url:"http://jasmine.github.io/",description:"Behavior-Driven JavaScript.",logo:"jasmine.png"},{title:"Karma",url:"http://karma-runner.github.io/",description:"Spectacular Test Runner for JavaScript.",logo:"karma.png"},{title:"Protractor",url:"https://github.com/angular/protractor",description:"End to end test framework for AngularJS applications built on top of WebDriverJS.",logo:"protractor.png"},{title:"Angular Material Design",url:"https://material.angularjs.org/#/",description:"The Angular reference implementation of the Google's Material Design specification.",logo:"angular-material.png"},{title:"Sass (Node)",url:"https://github.com/sass/node-sass",description:"Node.js binding to libsass, the C version of the popular stylesheet preprocessor, Sass.",logo:"node-sass.png"}];this.getTec=t}angular.module("public").service("webDevTec",t)}(),function(){"use strict";function t(){function t(t){var e=this;e.relativeDate=t(e.creationDate).fromNow()}t.$inject=["moment"];var e={restrict:"E",templateUrl:"app/components/navbar/navbar.html",scope:{creationDate:"="},controller:t,controllerAs:"vm",bindToController:!0};return e}angular.module("public").directive("acmeNavbar",t)}(),function(){"use strict";function t(t){function e(e,o,a,n){var i,r=t(o[0],{typeSpeed:40,deleteSpeed:40,pauseDelay:800,loop:!0,postfix:" "});o.addClass("acme-malarkey"),angular.forEach(e.extraValues,function(t){r.type(t).pause()["delete"]()}),i=e.$watch("vm.contributors",function(){angular.forEach(n.contributors,function(t){r.type(t.login).pause()["delete"]()})}),e.$on("$destroy",function(){i()})}function o(t,e){function o(){return a().then(function(){t.info("Activated Contributors View")})}function a(){return e.getContributors(10).then(function(t){return n.contributors=t,n.contributors})}var n=this;n.contributors=[],o()}o.$inject=["$log","githubContributor"];var a={restrict:"E",scope:{extraValues:"="},template:"&nbsp;",link:e,controller:o,controllerAs:"vm"};return a}t.$inject=["malarkey"],angular.module("public").directive("acmeMalarkey",t)}(),function(){"use strict";function t(t,e){function o(o){function n(t){return t.data}function i(e){t.error("XHR Failed for getContributors.\n"+angular.toJson(e.data,!0))}return o||(o=30),e.get(a+"/contributors?per_page="+o).then(n)["catch"](i)}var a="https://api.github.com/repos/Swiip/generator-gulp-angular",n={apiHost:a,getContributors:o};return n}t.$inject=["$log","$http"],angular.module("public").factory("githubContributor",t)}(),function(){"use strict";function t(t,e,o,a,n,i,r){function l(t){u.data=angular.copy(_.sample(t,3)),u.incorrect=angular.copy(_.sample(t,1));var e=_.sample([0,1,2],1);u.data[e].object=u.incorrect[0].object}function s(){d(),t(function(){u.classAnimation="rubberBand"},4e3)}function c(){r.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>'),u.classAnimation=""}function d(){u.awesomeThings=i.getTec(),angular.forEach(u.awesomeThings,function(t){t.rank=Math.random()})}var u=this;u.awesomeThings=[],u.classAnimation="",u.creationDate=1506416316076,u.showToastr=c,u.generateObjects=function(){var t=n.getInfo();l(t)},u.getcaptcha=function(){var t=e("/captcha");t.query({method:"GET",isArray:!1,operation:"view"}).$promise.then(function(t){u.loader=!1;Math.floor((o.innerHeight-400)/41);t&&(n.setInfo(t),l(t))},function(t){t&&$state.go("error")})},u.getcaptcha(),$(document).on("mousemove",function(t){var e=$(document).width()/15,o=$(document).height()/15,a=t.pageX/e,n=t.pageY/o;$(".eye-ball").css({width:a,height:n})}),$("#solve").click(function(){u.incorrect[0].object.toLowerCase()==u.name.toLowerCase()?(u.alert="Great! Correct",$("form").addClass("wrong-entry"),setTimeout(function(){$("form").removeClass("wrong-entry")},1e4)):(u.alert="Oops! Incorrect",$("form").addClass("wrong-entry"),setTimeout(function(){$("form").removeClass("wrong-entry")},1e4))}),s()}t.$inject=["$timeout","$resource","$window","$log","CaptchaDataService","webDevTec","toastr"],angular.module("public").controller("MainController",t)}(),function(){"use strict";function t(t,e,o,a,n,i,r,l,s,c,d){function u(t,o){t.hide=function(){o.hide()},t.cancel=function(){o.cancel()},t.submit=function(){t.file&&t.upload(t.file)},t.upload=function(a){e.upload({url:"/captcha/upload",data:{file:a,object:t.name}}).then(function(t){console.log("Success "+t.config.data.file.name+"uploaded. Response: "+t.data),"ok"==t.data&&(o.hide(),m.getcaptcha())},function(t){console.log("Error status: "+t.status)},function(t){var e=parseInt(100*t.loaded/t.total);console.log("progress: "+e+"% "+t.config.data.file.name)})}}u.$inject=["$scope","$mdDialog"];var m=this;m.showAdvanced=function(t){a.show({controller:u,templateUrl:"dialog.tmpl.html",parent:angular.element(document.body),targetEvent:t,clickOutsideToClose:!0,fullscreen:n.customFullscreen}).then(function(t){n.status='You said the information was "'+t+'".'},function(){n.status="You cancelled the dialog."})},m.goConfig=function(t,e){"add"==t&&$state.go("editCaptcha",{operation:"add"}),"edit"==t&&$state.go("editCaptcha",{operation:"edit",id:e}),"view"==t&&$state.go("editCaptcha",{operation:"view",id:e})},m.delData=function(t){var e=confirm("Want to delete?");if(e){m.loader=!0;var o=r("/captcha");o.get({operation:"del",id:t}).$promise.then(function(t){m.loader=!1,console.log(t),t&&m.getcaptcha()},function(t){t&&$state.go("error")})}},m.getcaptcha=function(){var t=r("/captcha");t.query({method:"GET",isArray:!1,operation:"view"}).$promise.then(function(t){m.loader=!1;Math.floor((i.innerHeight-400)/41);t&&(console.log("data is"),o.debug(t),m.data=t,s.setInfo(t))},function(t){t&&$state.go("error")})},m.getcaptcha()}function e(t,e,o,a){var n=this;if(n.cid=null,n.operation=t.params.operation,"edit"==n.operation||"view"==n.operation)if(void 0==a.getInfo())t.go("Captcha");else{var i=a.getInfo()[t.params.id-1];n.data=i}n.configCaptcha=function(e){n.loader=!0;var a=o("/captcha");a.get({operation:e,data:n.data}).$promise.then(function(e){n.loader=!1,e&&t.go("Captcha")},function(e){e&&t.go("error")})}}t.$inject=["$timeout","Upload","$log","$mdDialog","$scope","$window","$resource","$location","CaptchaDataService","webDevTec","toastr"],e.$inject=["$state","$log","$resource","CaptchaDataService"],angular.module("public").controller("CaptchaController",t).controller("editCaptchaController",e)}(),function(){"use strict";function t(t,e,o,a,n){var i=this;i.submit=function(){n.Login(i.formData.email,i.formData.password,"view",function(t){console.log(t),t.success?(n.SetCredentials(i.username,i.password),a.path("/captcha")):i.dataLoading=!1})}}t.$inject=["$timeout","webDevTec","toastr","$location","AuthenticationService"],angular.module("public").controller("AdminController",t)}(),function(){"use strict";function t(t,e,o,a,n){var i=e.$on("$locationChangeStart",function(){e.globals=a.getObject("globals")||{},e.globals.currentUser&&(n.defaults.headers.common.Authorization="Basic "+e.globals.currentUser.authdata);var t=-1===o.path().indexOf(["/admin","/"]),i=e.globals.currentUser;t&&!i&&o.path("/admin")});return i}t.$inject=["$log","$rootScope","$location","$cookies","$http"],angular.module("public").run(t)}(),function(){"use strict";function t(t){t.when("/",{templateUrl:"app/main/main.html",controllerAs:"MainController"}).when("/admin",{templateUrl:"app/admin/admin.html",controller:"AdminController"}).when("/captcha",{templateUrl:"app/captcha/captcha.html",controller:"AdminController"}).otherwise({redirectTo:"/"})}t.$inject=["$routeProvider"],angular.module("public").config(t)}(),function(){"use strict";angular.module("public").constant("malarkey",malarkey).constant("moment",moment)}(),function(){"use strict";function t(t,e){t.debugEnabled(!0),e.allowHtml=!0,e.timeOut=3e3,e.positionClass="toast-top-right",e.preventDuplicates=!0,e.progressBar=!0}t.$inject=["$logProvider","toastrConfig"],angular.module("public").config(t)}(),angular.module("public").run(["$templateCache",function(t){t.put("app/admin/admin.html",'<div ng-controller="AdminController as vm"><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div><md-content layout=row layout-align=space-around layout-padding=layout-padding ng-cloak=ng-cloak class=login-form><md-card flex=flex flex-gt-sm=50 flex-gt-md=33><md-toolbar><div class=md-toolbar-tools><h2><span>Login Form</span></h2></div></md-toolbar><md-card-content><form name=Form style="max-width: 100% !important; margin-top: 30%"><md-input-container class=md-block><label>Login</label><input type=text name=email ng-model=vm.formData.email placeholder=login required><div ng-messages=Form.email.$error role=alert multiple><div ng-message=required class=my-message>Please enter your email.</div></div></md-input-container><md-input-container class=md-block><label>Password</label><input type=password name=password ng-model=vm.formData.password placeholder=password required md-maxlength=16><div ng-messages=Form.password.$error role=alert multiple><div ng-message=required class=my-message>Please enter your password.</div><div ng-message=md-maxlength class=my-message>Too long.</div></div></md-input-container><md-button ng-disabled=!Form.$valid ng-click=vm.submit() class="md-raised md-primary">&nbsp Login &nbsp</md-button></form></md-card-content></md-card></md-content><!-- Angular Material Dependencies--></div></div>'),t.put("app/captcha/captcha.html",'<div class="container-fluid top" style="background: white; overflow: auto; height: 620px" ng-controller="CaptchaController as vm"><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div class=text-center><h1>Captcha Objects</h1><div class="row ball-spin-fade-loader pull-right"><button type=button class="btn btn-success" ng-click=vm.showAdvanced($event)>Add Data</button></div><script type=text/ng-template id=dialog.tmpl.html><md-dialog aria-label="Carica foto">\n        <form ng-cloak role="form" style="max-width: 100% !important;">\n          <md-toolbar>\n            <div class="md-toolbar-tools">\n              <h2>Upload photo</h2>\n              <span flex></span>\n              <md-button class="md-icon-button" ng-click="cancel()">\n                <md-icon md-svg-src="img/icons/ic_close_24px.svg" aria-label="Close dialog"></md-icon>\n              </md-button>\n            </div>\n          </md-toolbar>\n          <md-dialog-content>\n            <div class="md-dialog-content">\n              <h1>Object Upload</h1>\n              <md-input-container>\n                <label>Object Name</label>\n                <input ng-model="name">\n              </md-input-container>\n              <br/><br/>\n              <input\n                type="file"\n                ngf-select\n                ng-model="file"\n                name="file"\n                ngf-max-size="20MB"\n              />\n            </div>\n          </md-dialog-content>\n          <md-dialog-actions layout="row">\n            <span flex></span>\n            <md-button ng-click="submit()">Upload</md-button>\n          </md-dialog-actions>\n        </form>\n      </md-dialog></script><!-- exact table from live demo --><md-table-container><table md-table><thead md-head><!-- when the user clicks this cell, the myOrder variable will get the value \'nameToLower\' --><th md-column>object name</th><!-- the variable myOrder will not be changed when this cell is clicked --><th md-column>Source</th></thead><tbody md-body><!-- we can let ng-repeat sort the columns for us --><tr md-row md-select=object md-select-id=name md-auto-select ng-repeat="object in vm.data"><td md-cell>{{object.object}}</td><td md-cell>{{object.src}}</td></tr></tbody></table></md-table-container></div></div>'),t.put("app/captcha/edit.html",'<div class="container editcard" ng-controller="editOrganizationController as vm"><div><acme-navbar creation-date=main.creationDate></acme-navbar></div><div class=text-center><!-- Submitted March 7 @ 11:05pm  --><div class=container><div class=row><div class=col-md-4><img src=https://cdn1.iconfinder.com/data/icons/softwaredemo/PNG/256x256/Pencil3.png class="img-responsive center-block" alt=""></div><!--.col --><div class=col-md-7><h3>{{ vm.operation | capitalize }} Organization <a ui-sref=organization><button type=button class="btn btn-primary btn-arrow-left pull-right">Cancel</button></a></h3><form name=frmComment ng-submit=vm.configOrganization(vm.operation) id=frmComment><div class=row><div class=col-md-6><label for=txtComment>Name</label><input type=text name=commentUser id=txtComment class=form-control ng-model=vm.data.orgName placeholder="Organization Name" ng-disabled="vm.operation==\'view\'" required></div><div class=col-md-6><label for=txtComment>Email</label><input type=text name=commentUser id=orgEmail class=form-control ng-model=vm.data.orgEmail placeholder=Email ng-disabled="vm.operation==\'view\'" required></div></div><div class=row><div class=col-md-6><label for=txtComment>Address 1</label><input type=text name=commentUser id=orgAddress class=form-control ng-model=vm.data.orgAddress placeholder="Address " ng-disabled="vm.operation==\'view\'" required></div><div class=col-md-6><label for=txtComment>Phone</label><input type=text name=commentUser id=orgPhone class=form-control ng-model=vm.data.orgPhone placeholder=Phone ng-disabled="vm.operation==\'view\'" required></div></div><div class=row><div class=col-md-6><label for=txtComment>Adress 2</label><input type=text name=commentUser id=orgAddress2 class=form-control ng-model=vm.data.orgAddress2 placeholder="Address 1" ng-disabled="vm.operation==\'view\'" required></div><div class=col-md-6><label for=orgZipCode>orgZipCode</label><input type=text name=commentUser id=orgZipCode class=form-control ng-model=vm.data.orgZipCode placeholder=orgZipCode ng-disabled="vm.operation==\'view\'" required></div></div><div class=row><div class=col-md-6><label for=txtComment>City</label><input type=text name=commentUser id=orgCity class=form-control ng-model=vm.data.orgCity placeholder="City " ng-disabled="vm.operation==\'view\'" required></div><div class=col-md-6><label for=txtComment>State</label><select ng-model=vm.data.orgState class=form-control name=state id=state><option value="" selected>Select a State</option><option value=AL>Alabama</option><option value=AK>Alaska</option><option value=AZ>Arizona</option><option value=AR>Arkansas</option><option value=CA>California</option><option value=CO>Colorado</option><option value=CT>Connecticut</option><option value=DE>Delaware</option><option value=DC>District Of Columbia</option><option value=FL>Florida</option><option value=GA>Georgia</option><option value=HI>Hawaii</option><option value=ID>Idaho</option><option value=IL>Illinois</option><option value=IN>Indiana</option><option value=IA>Iowa</option><option value=KS>Kansas</option><option value=KY>Kentucky</option><option value=LA>Louisiana</option><option value=ME>Maine</option><option value=MD>Maryland</option><option value=MA>Massachusetts</option><option value=MI>Michigan</option><option value=MN>Minnesota</option><option value=MS>Mississippi</option><option value=MO>Missouri</option><option value=MT>Montana</option><option value=NE>Nebraska</option><option value=NV>Nevada</option><option value=NH>New Hampshire</option><option value=NJ>New Jersey</option><option value=NM>New Mexico</option><option value=NY>New York</option><option value=NC>North Carolina</option><option value=ND>North Dakota</option><option value=OH>Ohio</option><option value=OK>Oklahoma</option><option value=OR>Oregon</option><option value=PA>Pennsylvania</option><option value=RI>Rhode Island</option><option value=SC>South Carolina</option><option value=SD>South Dakota</option><option value=TN>Tennessee</option><option value=TX>Texas</option><option value=UT>Utah</option><option value=VT>Vermont</option><option value=VA>Virginia</option><option value=WA>Washington</option><option value=WV>West Virginia</option><option value=WI>Wisconsin</option><option value=WY>Wyoming</option></select></div></div><div class=row><div class=col-md-6><label></label><button type=submit class="btnMargin form-control btn-sm btn btn-danger" value=Submit ng-hide="vm.operation==\'view\'">Save Data</button></div></div></form><hr><div loader-css=line-scale-pulse-out-rapid ng-show=vm.loader></div></div><!--.col --></div><!--./row --></div><!--./container --></div></div>'),t.put("app/main/main.html",'<div layout-fill ng-controller="MainController as vm"><md-content style="background: repeat-y"><div class=panda><div class=ear></div><div class=face><div class=eye-shade></div><div class=eye-white><div class=eye-ball></div></div><div class="eye-shade rgt"></div><div class="eye-white rgt"><div class=eye-ball></div></div><div class=nose></div><div class=mouth></div></div><div class=body></div><div class=foot><div class=finger></div></div><div class="foot rgt"><div class=finger></div></div></div><form><div class=hand></div><div class="hand rgt"></div><h1>Captcha Solver</h1><h7 layout=row layout-margin class=_md-subheader-content>Enter the name of the object that does not correspond to the images on the left</h7><div layout=row layout-align="start center" ng-repeat="data in vm.data"><div flex=70 layout=row layout-align="start start"><md-whiteframe class=md-whiteframe-24dp layout layout-align="center center"><img height=50 width=100 ng-src=/uploads/{{data.src}}></md-whiteframe></div><h7 flex=30 class=blur>{{data.object}}</h7></div><div layout=row layout-margin layout-align="center center"><div class=form-group flex=75><input id=object autocomplete=off ng-model=vm.name type=text required class=form-control><label class=form-label>Enter the name of incorrect object</label><p class=alert id=alert>{{vm.alert}}</p><button type=button class=btn ng-click=vm.generateObjects()>Generate</button> <button class=btn id=solve>Solve</button></div></div></form></md-content></div>'),t.put("app/components/navbar/navbar.html",'<md-toolbar layout=row layout-align="center center"><md-button href=https://github.com/Swiip/generator-gulp-angular>Captcha Admin</md-button><section flex layout=row layout-align="left center"><md-button href=#/ class=md-raised>Home</md-button></section><md-button class=acme-navbar-text>{{ username }}</md-button></md-toolbar>')}]);
//# sourceMappingURL=../maps/scripts/app-76b728e961.js.map
