class IncidentsController < ApplicationController
  def index
    @incidents = Incident.all

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @incidents.geocoded.map do |incident|
      {
        lat: incident.latitude,
        lng: incident.longitude
        #info_window: render_to_string(partial: "info_window", locals: { incident: incident })
      }
    end
  end

  def show
    @incident = Incident.find(params[:id])
  end

  def new
    @incident = Incident.new
  end

  def create
    @incident = Incident.new(incident_params)
    @incident.user = current_user
    if @incident.save
      redirect root_path
    else
      render :new
    end
  end

  private

  def incident_params
    params.require(:incident).permit(:address, :date, :time, :category, :description, :photos, :authorities, :status)
end
