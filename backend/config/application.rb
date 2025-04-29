require "rack/cors"
require "devise"
require "devise_token_auth"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "active_job/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

module App
  class Application < Rails::Application
    config.load_defaults 8.0
    config.api_only = true

    # ここ追加！
    config.middleware.use ActionDispatch::Cookies
    config.middleware.use ActionDispatch::Session::CookieStore
  end
end