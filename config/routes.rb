Rails.application.routes.draw do
  root to: 'pages#home'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
<<<<<<< HEAD

  resources :incidents, only: [:new, :create]
=======
  resources :incidents
>>>>>>> 4ef0b393b122416cdb005b12fb848e70bbeec1f3
end
