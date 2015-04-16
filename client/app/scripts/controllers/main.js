'use strict';

/**
 * @ngdoc function
 * @name timeTrackerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the timeTrackerApp
 */
angular.module('timeTrackerApp.controllers', ['timeTrackerApp.services'])
  .controller('MainCtrl', function ($scope, TimeRecord) {
    $scope.timeRecords = TimeRecord.query();
  });
