Rails.application.routes.draw do
  devise_for :users
  resources :countries
  root to: "countries#index"
  #resources :posts
end
