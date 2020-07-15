class EventsController < ApplicationController
  before_action :authenticate_user!

  def index
  end

  def all_events
    events = current_user.events.all.order(created_at: :desc)
    render json: events
  end

  def new
  end

  def show
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def create
    event = current_user.events.create!(event_params)
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def edit
  end

  def update
    update_event = event.update!(event_params)
    if update_event
      render json: update_event
    else
      render json: update_event.errors
    end
  end

  def destroy
    event&.destroy
    render json: { message: "Event deleted!" }
  end

  private

  def event_params
    params.permit(:name, :paid, :cost, :active, :registration_from, :registration_to, :date, :description)
  end

  def event
    @event ||= current_user.events.find(params[:id])
  end
end
