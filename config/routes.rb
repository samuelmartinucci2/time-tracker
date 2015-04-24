Rails.application.routes.draw do
  root :to => redirect('/index.html')
  mount_devise_token_auth_for 'User', at: 'api/auth'


  scope :api do
    get '/time_records/current' => "time_records#current"
    resources :time_records, except: [:new, :edit]
  end
end
