class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  include ActionController::MimeResponds
  before_action :configure_permitted_parameters, if: :devise_controller?

  def self.respond_to(*mimes)
    include ActionController::RespondWith::ClassMethods
  end

  respond_to :json

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:confirm_success_url, :config_name) }
  end
end
