app = angular.module('timeTrackerApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ng-token-auth',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker',
  'ui.router',
  'mgcrea.ngStrap',
  'timeTrackerApp.controllers'
]);

app.config ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$sceProvider', '$authProvider',
            '$httpProvider'
  ($stateProvider, $urlRouterProvider, $locationProvider, $sceProvider, $authProvider, $httpProvider) ->
    $authProvider.configure([
      default:
        apiUrl: '/api/v1'
        authProviderPaths:
          linkedin: '/auth/linkedin'
          facebook: '/auth/facebook'
          google: '/auth/google'
          twitter: '/auth/twitter'
    ]);

    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content')

    # disable sce
    # TODO: FIX
    $sceProvider.enabled(false)

    # push-state routes
    $locationProvider.html5Mode(false);

    # default to 404 if state not found
    $urlRouterProvider.otherwise('/404');

    $stateProvider
    .state 'index',
      url: '/'
      templateUrl: '/views/main.html'
      controller: 'MainCtrl'
      resolve:
        auth: ['$auth', ($auth) -> return $auth.validateUser()]

    .state 'null',
      url: ''
      templateUrl: '/views/main.html'
      controller: 'MainCtrl'
      resolve:
        auth: ['$auth', ($auth) -> return $auth.validateUser()]

    $stateProvider
    .state 'about',
      url: '/about'
      templateUrl: '/views/about.html'

    .state 'sign_in',
      url: '/sign_in'
      templateUrl: '/views/user_sessions/new.html'
      controller: 'UserSessionsCtrl',
      data: {
        permissions: {
          only: ['anonymous'],
          redirectTo: 'index'
        }
      }

    .state 'sign_up',
      url: '/sign_up'
      templateUrl: '/views/user_registrations/new.html'
      controller: 'UserRegistrationsCtrl',
      data: {
        permissions: {
          only: ['anonymous'],
          redirectTo: 'index'
        }
      }

    .state 'reset_password',
      url: '/reset_password'
      templateUrl: '/views/user_registrations/reset.html'
      controller: 'UserRegistrationsCtrl'

    .state '404',
      url: '/404'
      templateUrl: '/404.html'
]

app.run ['$rootScope', '$modal', '$state', ($rootScope, $modal, $state) ->
  # event listeners
  $rootScope.$on('auth:registration-email-success', (ev, data) ->
    $modal({
      title: "Success"
      html: true
      content: "<div id='alert-registration-email-sent'>A registration email was " +
        "sent to " + data.email + ". follow the instructions contained in the " +
        "email to complete registration.</div>"
    })

    delete $rootScope.registrationForm[field] for field, val of $rootScope.registrationForm
  )

  $rootScope.$on('auth:registration-email-error', (ev, data) ->
    errors = _(data.errors)
    .map((v, k) -> "#{k}: #{v}.")
    .value()
    .join("<br/>")

    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-registration-email-failed'>Unable to send email " +
        "registration. " + errors + "</div>"
    })
  )

  $rootScope.$on('auth:email-confirmation-success', (ev, data) ->
    $modal({
      title: "Success!"
      html: true
      content: "<div id='alert-email-confirmation-success'>Welcome " +
        data.email + ". Your account has been successfully created." +
        "</div>"
    })
  )

  $rootScope.$on('auth:email-confirmation-error', (ev, data) ->
    $modal({
      title: "Error!"
      html: true
      content: "<div id='alert-email-confirmation-error'>Unable to confirm " +
        "your account. Request a password reset to verify your identity." +
        "</div>"
    })
  )

  $rootScope.$on('auth:password-reset-request-success', (ev, params) ->
    $modal({
      title: "Success"
      html: true
      content: "<div id='alert-password-reset-request-success'>Password reset " +
        "instructions have been sent to " + params.email + "</div>"
    })
  )

  $rootScope.$on('auth:password-reset-request-error', (ev, data) ->
    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-password-reset-request-error'>Error: " +
        _.map(data.errors).toString() + "</div>"
    })
  )

  $rootScope.$on('auth:password-reset-confirm-error', (ev, data) ->
    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-password-reset-request-error'>Error: " +
        _.map(data.errors).toString() + "</div>"
    })
  )

  passwordChangeModal = $modal({
    title: "Change your password!"
    html: true
    show: false
    contentTemplate: 'views/user_registrations/password-reset-modal.html'
  })

  passwordChangeSuccessModal = $modal({
    title: "Success"
    html: true
    show: false
    content: "<div id='alert-password-change-success'>Your password " +
      "has been successfully updated."
  })

  passwordChangeErrorScope = $rootScope.$new()
  passwordChangeErrorModal = $modal({
    title: "Error"
    html: true
    show: false
    scope: passwordChangeErrorScope
    contentTemplate: 'views/user_registrations/password-change-error-modal.html'
  })

  $rootScope.showPasswordChangeModal = -> passwordChangeModal.show()

  $rootScope.$on('auth:password-reset-confirm-success', -> passwordChangeModal.show())

  $rootScope.$on('auth:password-change-success', ->
    passwordChangeModal.hide()
    passwordChangeSuccessModal.show()
  )

  $rootScope.$on('auth:password-change-error', (ev, data) ->
    passwordChangeErrorScope.errors = data.errors
    passwordChangeModal.hide()
    passwordChangeErrorModal.show()
  )

  passwordChangeErrorScope.$on('modal.hide', ->
    passwordChangeModal.show()
  )

  $rootScope.$on('auth:login-success', (ev, user) ->
    $modal({
      title: "Success"
      html: true
      content: "<div id='alert-auth-login-success'>Welcome back " + user.email + '</div>'
    })

    delete $rootScope.loginForm[field] for field, val of $rootScope.loginForm
    delete $rootScope.registrationForm[field] for field, val of $rootScope.registrationForm

    $state.go('index')

  )

  $rootScope.$on('auth:invalid', () -> $state.go('sign_in'))

  $rootScope.$on('auth:login-error', (ev, data) ->
    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-login-error'>Authentication failure: " +
        data.errors[0] + '</div>'
    })
  )

  $rootScope.$on('auth:logout-success', (ev) ->
    $modal({
      title: 'Success'
      html: true
      content: "<div id='alert-logout-success'>Goodbye</div>"
    })
  )

  $rootScope.$on('auth:logout-error', (ev) ->
    $modal({
      title: 'Error'
      html: true
      content: "<div id='alert-logout-error'>Unable to complete logout. " +
        "Please try again.</div>"
    })
  )

  $rootScope.$on('auth:account-update-success', ->
    $modal({
      title: 'Success'
      html: true
      content: "<div id='alert-account-update-success'>Your account has been updated." +
        "</div>"
    })
  )

  $rootScope.$on('auth:account-update-error', (ev, data) ->
    errors = _(data.errors)
    .map((v, k) -> "#{k}: #{v}.")
    .value()
    .join("<br/>")

    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-account-update-error'>Unable to update " +
        "your account. " + errors + "</div>"
    })
  )

  $rootScope.$on('auth:account-destroy-success', ->
    $modal({
      title: 'Success'
      html: true
      content: "<div id='alert-account-destroy-success'>Your account has been destroyed." +
        "</div>"
    })
  )

  $rootScope.$on('auth:account-destroy-error', (ev, data) ->
    errors = _(data.errors)
    .map((v, k) -> "#{k}: #{v}.")
    .value()
    .join("<br/>")

    $modal({
      title: "Error"
      html: true
      content: "<div id='alert-account-destroy-error'>Unable to destroy " +
        "your account. " + errors + "</div>"
    })
  )
]
