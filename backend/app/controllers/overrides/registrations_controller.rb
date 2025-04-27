# backend/app/controllers/overrides/registrations_controller.rb
class Overrides::RegistrationsController < DeviseTokenAuth::RegistrationsController
    # JSONリクエストを受け取れるようにする
    skip_before_action :verify_authenticity_token, raise: false
  end