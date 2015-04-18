Rails.application.routes.draw do
  scope :api do
    mount_devise_token_auth_for 'User', at: 'auth'

    get '/time_records/current' => "time_records#current"
    resources :time_records, except: [:new, :edit]
  end
end
