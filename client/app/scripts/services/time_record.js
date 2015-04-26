angular
  .module('timeTrackerApp.services',[])
  .service('TimeRecord', ['$resource', function ($resource) {
  return $resource('/api/v1/time_records/:id.json', {id:'@id'}, {
    'update': {
      method: 'PUT'
    },
    'current_record': {
      method: 'GET',
      url:    '/api/v1/time_records/current',
      isArray: false
    }
  })
}])
