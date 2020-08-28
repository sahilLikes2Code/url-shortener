Rails.application.routes.draw do
  root to: 'urls#index'
  resource :url, only: %i[create index show new]
end
