Rails.application.routes.draw do
  root to: 'pages#index'
  resources :urls, only: %i[create index show new update]


  # put '/urls', to: 'urls#update'
  # get 'pages/index'
  # # put '/', to: 'urls#update'
end
