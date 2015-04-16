'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:UserRegistrationsCtrl
 * @description
 * # UserRegistrationsCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp')
  .controller('UserRegistrationsCtrl', ['$scope', '$location', '$auth', function ($scope, $location, $auth) {
    $scope.$on('auth:registration-email-error', function(ev, reason) {
      $scope.error = reason.errors;
    });
    $scope.handleRegBtnClick = function() {
      $auth.submitRegistration($scope.registrationForm)
        .then(function() {
          $auth.submitRegistration({
            email: $scope.registrationForm.email,
            password: $scope.registrationForm.password
          });
        });
    };
  }]);


