Rails.application.routes.draw do
  root to: 'pages#index'
  # get '/:id', to: 'urls#show'
  put 'urls/:id', to: 'urls#increase_click_count'
  patch 'urls/:id/', to: 'urls#pin_url'
  resources :urls, only: %i[create index show new]
end
