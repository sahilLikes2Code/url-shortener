Rails.application.routes.draw do
  root to: 'pages#index'
  put 'urls/:id', to: 'urls#increase_click_count'
  patch 'urls/:id/', to: 'urls#pin_url'
  resources :urls, only: %i[create index show new]
  get "*path", to: "pages#index", via: :all unless Rails.env.development?
end
