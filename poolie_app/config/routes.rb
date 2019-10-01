Rails.application.routes.draw do
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  get 'new-user' => 'users#new'
  post 'new-user' => 'users#create'
  get 'user' => 'users#show'

   get 'tables' => 'tables#index'
   get 'new-table' => 'tables#new'
   post 'new-table' => 'tables#create'
end
