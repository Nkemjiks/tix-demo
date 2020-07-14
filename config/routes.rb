Rails.application.routes.draw do
  root "events#index"
  get "events/all_events"
  get "new_event", to: "events#new"
  get "edit_event/:id", to: "events#edit"
  resources :events, only: [:create, :update, :show, :destroy]
end
