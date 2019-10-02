Rails.application.routes.draw do
  root controller: :rooms, action: :index
  resources :room_messages
  resources :rooms
  devise_for :users
end
