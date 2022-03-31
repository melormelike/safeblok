class IncidentsController < ApplicationController
  def index
    @incidents = Incident.all

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @incidents.geocoded.map do |incident|
      {
        lat: incident.latitude,
        lng: incident.longitude
      }
    end
  end

  def show
    @incident = Incident.find(params[:id])
  end
end
