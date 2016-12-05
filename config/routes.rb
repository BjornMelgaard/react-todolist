Rails.application.routes.draw do
  mount JasmineRails::Engine => '/specs' if defined?(JasmineRails)

  resources :projects

  resources :tasks, defaults: { format: :json } do
    put :done,     on: :member
    put :sort,     on: :member
    put :deadline, on: :member
  end

  resources :comments, defaults: { format: :json }, only: [:create, :destroy]

  resources :attachments, only: [:create]

  devise_for :users

  root 'projects#index'
end
