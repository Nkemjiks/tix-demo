Rails.application.routes.draw do
  root "events#index"
  get "events/all_events"
  resources :events, only: [:create, :update, :delete]
end
