class IncidentsController < ApplicationController
  def index
    @incidents = Incident.all

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @incidents.geocoded.map do |incident|
      {
        lat: incident.latitude,
        lng: incident.longitude,
        info_window: render_to_string(partial: "info_window", locals: { incident: incident }),
        #image_url:helpers.asset_url("#")
      }
    end
  end

  def show
    @incident = Incident.find(params[:id])
  end
end
