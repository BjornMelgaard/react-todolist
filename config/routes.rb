Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  root 'projects#index'

  devise_for :users, controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :projects

      resources :tasks do
        put :done,     on: :member
        put :sort,     on: :member
        put :deadline, on: :member
      end

      resources :comments, only: [:create, :destroy]

      resources :attachments, only: [:create]
    end
  end
end
