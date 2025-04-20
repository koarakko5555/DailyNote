# backend/config/routes.rb
Rails.application.routes.draw do
  devise_for :users
  namespace :api do
    namespace :v1 do
      resources :diaries, only: [:index, :show, :create, :update, :destroy]
      resources :plans
    end
  end
end