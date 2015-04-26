(function(){var a;a=angular.module("timeTrackerApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ng-token-auth","ui.bootstrap","ui.bootstrap.datetimepicker","ui.router","mgcrea.ngStrap","timeTrackerApp.controllers"]),a.config(["$stateProvider","$urlRouterProvider","$locationProvider","$sceProvider","$authProvider","$httpProvider",function(a,b,c,d,e,f){return e.configure([{"default":{apiUrl:"/api/v1",authProviderPaths:{linkedin:"/auth/linkedin",facebook:"/auth/facebook",google:"/auth/google",twitter:"/auth/twitter"}}}]),f.defaults.headers.common["X-CSRF-Token"]=$("meta[name=csrf-token]").attr("content"),d.enabled(!1),c.html5Mode(!1),b.otherwise("/404"),a.state("index",{url:"/",templateUrl:"/views/main.html",controller:"MainCtrl",resolve:{auth:["$auth",function(a){return a.validateUser()}]}}).state("null",{url:"",templateUrl:"/views/main.html",controller:"MainCtrl",resolve:{auth:["$auth",function(a){return a.validateUser()}]}}),a.state("about",{url:"/about",templateUrl:"/views/about.html"}).state("sign_in",{url:"/sign_in",templateUrl:"/views/user_sessions/new.html",controller:"UserSessionsCtrl",data:{permissions:{only:["anonymous"],redirectTo:"index"}}}).state("sign_up",{url:"/sign_up",templateUrl:"/views/user_registrations/new.html",controller:"UserRegistrationsCtrl",data:{permissions:{only:["anonymous"],redirectTo:"index"}}}).state("reset_password",{url:"/reset_password",templateUrl:"/views/user_registrations/reset.html",controller:"UserRegistrationsCtrl"}).state("404",{url:"/404",templateUrl:"/404.html"})}]),a.run(["$rootScope","$modal","$state",function(a,b,c){var d,e,f,g;return a.$on("auth:registration-email-success",function(c,d){var e,f,g,h;b({title:"Success",html:!0,content:"<div id='alert-registration-email-sent'>A registration email was sent to "+d.email+". follow the instructions contained in the email to complete registration.</div>"}),f=a.registrationForm,g=[];for(e in f)h=f[e],g.push(delete a.registrationForm[e]);return g}),a.$on("auth:registration-email-error",function(a,c){var d;return d=_(c.errors).map(function(a,b){return b+": "+a+"."}).value().join("<br/>"),b({title:"Error",html:!0,content:"<div id='alert-registration-email-failed'>Unable to send email registration. "+d+"</div>"})}),a.$on("auth:email-confirmation-success",function(a,c){return b({title:"Success!",html:!0,content:"<div id='alert-email-confirmation-success'>Welcome "+c.email+". Your account has been successfully created.</div>"})}),a.$on("auth:email-confirmation-error",function(a,c){return b({title:"Error!",html:!0,content:"<div id='alert-email-confirmation-error'>Unable to confirm your account. Request a password reset to verify your identity.</div>"})}),a.$on("auth:password-reset-request-success",function(a,c){return b({title:"Success",html:!0,content:"<div id='alert-password-reset-request-success'>Password reset instructions have been sent to "+c.email+"</div>"})}),a.$on("auth:password-reset-request-error",function(a,c){return b({title:"Error",html:!0,content:"<div id='alert-password-reset-request-error'>Error: "+_.map(c.errors).toString()+"</div>"})}),a.$on("auth:password-reset-confirm-error",function(a,c){return b({title:"Error",html:!0,content:"<div id='alert-password-reset-request-error'>Error: "+_.map(c.errors).toString()+"</div>"})}),f=b({title:"Change your password!",html:!0,show:!1,contentTemplate:"views/user_registrations/password-reset-modal.html"}),g=b({title:"Success",html:!0,show:!1,content:"<div id='alert-password-change-success'>Your password has been successfully updated."}),e=a.$new(),d=b({title:"Error",html:!0,show:!1,scope:e,contentTemplate:"views/user_registrations/password-change-error-modal.html"}),a.showPasswordChangeModal=function(){return f.show()},a.$on("auth:password-reset-confirm-success",function(){return f.show()}),a.$on("auth:password-change-success",function(){return f.hide(),g.show()}),a.$on("auth:password-change-error",function(a,b){return e.errors=b.errors,f.hide(),d.show()}),e.$on("modal.hide",function(){return f.show()}),a.$on("auth:login-success",function(d,e){var f,g,h,i;b({title:"Success",html:!0,content:"<div id='alert-auth-login-success'>Welcome back "+e.email+"</div>"}),g=a.loginForm;for(f in g)i=g[f],delete a.loginForm[f];h=a.registrationForm;for(f in h)i=h[f],delete a.registrationForm[f];return c.go("index")}),a.$on("auth:invalid",function(){return c.go("sign_in")}),a.$on("auth:login-error",function(a,c){return b({title:"Error",html:!0,content:"<div id='alert-login-error'>Authentication failure: "+c.errors[0]+"</div>"})}),a.$on("auth:logout-success",function(a){return b({title:"Success",html:!0,content:"<div id='alert-logout-success'>Goodbye</div>"})}),a.$on("auth:logout-error",function(a){return b({title:"Error",html:!0,content:"<div id='alert-logout-error'>Unable to complete logout. Please try again.</div>"})}),a.$on("auth:account-update-success",function(){return b({title:"Success",html:!0,content:"<div id='alert-account-update-success'>Your account has been updated.</div>"})}),a.$on("auth:account-update-error",function(a,c){var d;return d=_(c.errors).map(function(a,b){return b+": "+a+"."}).value().join("<br/>"),b({title:"Error",html:!0,content:"<div id='alert-account-update-error'>Unable to update your account. "+d+"</div>"})}),a.$on("auth:account-destroy-success",function(){return b({title:"Success",html:!0,content:"<div id='alert-account-destroy-success'>Your account has been destroyed.</div>"})}),a.$on("auth:account-destroy-error",function(a,c){var d;return d=_(c.errors).map(function(a,b){return b+": "+a+"."}).value().join("<br/>"),b({title:"Error",html:!0,content:"<div id='alert-account-destroy-error'>Unable to destroy your account. "+d+"</div>"})})}])}).call(this),angular.module("timeTrackerApp.controllers",["timeTrackerApp.services"]).controller("MainCtrl",["$scope","TimeRecord",function(a,b){a.selectRecord=function(b){a.selectedRecord=angular.copy(b)},a.updateRecord=function(c){a.selectedRecord.$update(function(){a.errors=null,c&&(a.timeRecords=b.query()),$("#recordModal").modal("hide"),$("#descModal").modal("hide")},function(b){a.errors=b.data})},a.timeRecords=b.query({q:a.filter_time}),a.current_time_record=b.current_record(),a.open=function(b){b.preventDefault(),b.stopPropagation(),a.opened=!0},a.clear=function(){a.filter_time=null},a.$watch("filter_time",function(){a.timeRecords=b.query({q:a.filter_time})}),a.checkin=function(){var c=new b({start_time:new Date});c.$save(function(){a.timeRecords=b.query(),a.current_time_record=c})},a.checkout=function(){a.current_time_record.end_time=new Date,a.current_time_record.$update(function(){a.timeRecords=b.query(),a.current_time_record=null})},a.notSameDay=function(a,b){a=new Date(a),b=new Date(b);var c=new Date(a.getFullYear(),a.getMonth(),a.getDate()),d=new Date(b.getFullYear(),b.getMonth(),b.getDate());return d.getTime()>c.getTime()}}]),angular.module("timeTrackerApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("timeTrackerApp").controller("UserSessionsCtrl",["$scope",function(a){a.$on("auth:login-error",function(b,c){a.error=c.errors})}]),angular.module("timeTrackerApp").controller("UserRegistrationsCtrl",["$scope","$location","$auth",function(a,b,c){}]),angular.module("timeTrackerApp.services",[]).service("TimeRecord",["$resource",function(a){return a("/api/v1/time_records/:id.json",{id:"@id"},{update:{method:"PUT"},current_record:{method:"GET",url:"/api/v1/time_records/current",isArray:!1}})}]);