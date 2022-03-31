class IncidentsController < ApplicationController
  def index
    @incidents = Incident.all
  end
end
