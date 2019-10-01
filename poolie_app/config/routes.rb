Rails.application.routes.draw do
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'

  get 'new-user' => 'users#new'
  post 'new-user' => 'users#create'
end
