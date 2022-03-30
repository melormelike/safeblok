class IncidentsController < ApplicationController
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
end
