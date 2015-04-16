'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp')
  .controller('UserSessionsCtrl', ['$scope', function ($scope) {
    $scope.$on('auth:login-error', function(ev, reason) {
      $scope.error = reason.errors;
    });
  }]);
