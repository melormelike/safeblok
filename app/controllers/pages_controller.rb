require "json"
require "open-uri"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    @my_incidents = Incident.where(user: current_user.id)
    # @my_incidents = Incident.all
  end
end
