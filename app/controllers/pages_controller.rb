class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home
    if current_user != nil
      @my_incidents = Incident.where(user: current_user.id)
    # @my_incidents = Incident.all
    end
  end
end
