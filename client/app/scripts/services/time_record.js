var app = angular
  .module('timeTrackerApp.services',[]);

app.service('TimeRecord', ['$resource', function ($resource) {
  return $resource('/api/time_records/:id.json', null, {
    'update': {method: 'PUT'}
  })
}])
