angular
  .module('timeTrackerApp.services',[])
  .service('TimeRecord', ['$resource', function ($resource) {
  return $resource('/api/time_records/:id.json', {id:'@id'}, {
    'update': {
      method: 'PUT'
    },
    'current_record': {
      method: 'GET',
      url:    '/api/time_records/current',
      isArray: false
    }
  })
}])
