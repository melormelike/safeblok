class IncidentsController < ApplicationController
  # skip_before_action :authenticate_user!, only: [:index, :show, :edit, :create, :update]

  def index
    @incidents = policy_scope(Incident)

    # stats
    apiKey = ENV['MAPBOX_API_KEY']

    @incidents_per_location = Hash.new(0)

    @incidents.each do |location|
      url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{location.longitude},#{location.latitude}.json?access_token=#{apiKey}"
      neighborhood = JSON.parse(URI.open(url).read)
      @incidents_per_location[neighborhood["features"][1]["text"]] += 1
    end

    @incidents_per_location = @incidents_per_location.sort_by { |_key, value| value }.reverse.first(3).to_h
    @incidents_per_category = Incident.group(:category).count.sort_by { |_key, value| value }.reverse.first(5).to_h
    @incidents_per_time = Incident.group(:time).count.sort_by { |_key, value| value }
    @incidents_per_date = Incident.group(:date).count

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @incidents.geocoded.map do |incident|
      {
        lat: incident.latitude,
        lng: incident.longitude,
        info_window: render_to_string(partial: "info_window", locals: { incident: incident, markers: @incidents }),
        image_url: helpers.asset_url("marker.png")
      }
    end
  end

  def show
    @incident = Incident.find(params[:id])
    authorize @incident
  end

  def new
    @incident = Incident.new
    authorize @incident
  end

  def create
    @incident = Incident.new(incident_params)
    @incident.user = current_user
    authorize @incident
    if @incident.save
      redirect_to incident_path(@incident)
    else
      render :new
    end
  end

  def update
    @incident = Incident.find(params[:id])
    @incident.update(incident_params)
    authorize @incident
  end

  def edit
    @incident = Incident.find(params[:id])
    authorize @incident
  end

  private

  def incident_params
    params.require(:incident).permit(:address, :date, :time, :category, :description, :photos, :authorities)
  end
end
