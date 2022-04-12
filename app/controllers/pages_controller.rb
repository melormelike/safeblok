require "json"
require "open-uri"

class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: :home

  def home

    apiKey = ENV['MAPBOX_API_KEY']

    @incidents_per_location = Hash.new(0)
    @incidents = Incident.all
    # @incident = Incident.find(params[:id])
    # @address = @incident.address

    @incidents.each do |location|
      url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{location.longitude},#{location.latitude}.json?access_token=#{apiKey}"
      neighborhood = JSON.parse(URI.open(url).read)
      @incidents_per_location[neighborhood["features"][1]["text"]] += 1
    end
    @incidents_per_location = @incidents_per_location.sort_by{|_key, value| value}.reverse.first(3).to_h
    @incidents_per_category = Incident.group(:category).count.sort_by{|_key, value| value}.reverse.first(5).to_h
    @incidents_per_time = Incident.group(:time).count.sort_by{|_key, value| value}
    @incidents_per_date = Incident.group(:date).count
  end
end
