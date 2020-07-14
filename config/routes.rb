Rails.application.routes.draw do
  root "events#index"
  devise_for :users
  devise_scope :user do
    get "/users/sign_out" => "devise/sessions#destroy"
  end
  get "events/all_events"
  get "new_event", to: "events#new"
  get "edit_event/:id", to: "events#edit"
  resources :events, only: [:create, :update, :show, :destroy]
end
