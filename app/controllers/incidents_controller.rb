class IncidentsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:index, :show, :edit, :create, :update]

  def index
    @incidents = policy_scope(Incident)

    # the `geocoded` scope filters only flats with coordinates (latitude & longitude)
    @markers = @incidents.geocoded.map do |incident|
      {
        lat: incident.latitude,
        lng: incident.longitude,
        info_window: render_to_string(partial: "info_window", locals: { incident: incident }),
        image_url: helpers.asset_url("alert2.png")
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
      redirect_to root_path
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
