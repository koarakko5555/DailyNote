Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # 必要に応じて制限する
    resource '*',
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'], # ← devise_token_auth使うならこれ必要
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end