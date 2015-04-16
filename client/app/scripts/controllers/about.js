'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
