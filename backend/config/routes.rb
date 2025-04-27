Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth', controllers: {
    registrations: 'overrides/registrations'
  }

  namespace :api do
    namespace :v1 do
      resources :diaries, only: [:index, :show, :create, :update, :destroy]
      resources :plans
    end
  end
end