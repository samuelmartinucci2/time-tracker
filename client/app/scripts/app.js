'use strict';

/**
 * @ngdoc overview
 * @name timeTrackerApp
 * @description
 * # timeTrackerApp
 *
 * Main module of the application.
 */
var app = angular
  .module('timeTrackerApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ng-token-auth',
    'ui.bootstrap',
    'timeTrackerApp.controllers'
  ]);

app
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        resolve: {
          auth: ['$auth', function ($auth) {
            return $auth.validateUser();
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/sign_in', {
        templateUrl: 'views/user_sessions/new.html',
        controller: 'UserSessionsCtrl'
      })
      .when('/sign_up', {
        templateUrl: 'views/user_registrations/new.html',
        controller: 'UserRegistrationsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .config(function($authProvider) {
    $authProvider.configure({
      confirmationSuccessUrl:  window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: ''),
      authProviderPaths: {
        twitter: '/auth/twitter',
        facebook: '/auth/facebook',
        linkedin: '/auth/linkedin',
        google: '/auth/google'
      }
    })
  });


app.run(['$rootScope', '$location', '$modal', function($rootScope, $location, $modal) {
  $rootScope.$on('auth:login-success', function(ev, user) {
    $location.path('/');
    showAlert($rootScope, $modal, 'Success', 'Welcome back ' + user.email);
  });

  $rootScope.$on('auth:login-error', function(ev, data) {
    showAlert($rootScope, $modal, 'Failure', 'Authentication failure: ' + data.errors[0]);
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    $location.path('/signin');
    showAlert($rootScope, $modal, 'Success', 'See you soon!');
  });

  $rootScope.$on('auth:logout-error', function(ev, data) {
    showAlert($rootScope, $modal, 'Failure', 'Signout failure: ' + data.errors[0]);
  });

  $rootScope.$on('auth:registration-email-success', function(ev, message) {
    showAlert($rootScope, $modal, 'Success', 'A registration email was sent to ' + message.email);
  });

  $rootScope.$on('auth:registration-email-error', function(ev, data) {
    showAlert($rootScope, $modal, 'Failure', 'Registration failure: ' + data.errors[0]);
  });
}]);




function showAlert($scope, $modal, title, message) {
  $scope.title = title;
  $scope.message = message;
  var modal = $modal.open({
    html: true,
    templateUrl: 'modalMessage.html'
  });

  $scope.close = function() {
    modal.close('');
  }
}
