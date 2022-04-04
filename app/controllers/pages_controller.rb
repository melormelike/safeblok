class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    @incidents = Incident.all
    # @incident = Incident.find(params[:id])
    # @address = @incident.address
    @incidents_per_location = Incident.group(:address).count
    @incidents_per_category = Incident.group(:category).count.sort_by {|_key, value| value}.reverse.first(2).to_h
  end
end
