Rails.application.routes.draw do
  resources :countries
  root to: "countries#index"
  #resources :posts
end
