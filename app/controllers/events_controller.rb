class EventsController < ApplicationController
  def index
  end

  def all_events
    events = Event.all.order(created_at: :desc)
    render json: events
  end

  def show
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def create
    event = Event.create!(event_params)
    if event
      render json: event
    else
      render json: event.errors
    end
  end

  def update
  end

  def delete
    event&.destroy
    render json: { message: "Event deleted!" }
  end

  private

  def event_params
    params.permit(:name, :paid, :cost, :active, :registration_from, :registration_to, :date)
  end

  def event
    @event ||= Event.find(params[:id])
  end
end
