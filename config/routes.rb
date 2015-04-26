Rails.application.routes.draw do
  root to: redirect('index.html')
  mount_devise_token_auth_for 'User', at: 'auth'

  namespace :api, :defaults => { :format => 'json' } do
    scope :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      get '/time_records/current' => "time_records#current"
      resources :time_records, except: [:new, :edit]
    end
  end
end
