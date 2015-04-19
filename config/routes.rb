Rails.application.routes.draw do
  root :to => redirect('/index.html')
  get "/auth/:provider/callback" => "sessions#create"

  # token auth routes available at /api/v1/auth
  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth'

    get '/time_records/current' => "time_records#current"
    resources :time_records, except: [:new, :edit]
  end
end
