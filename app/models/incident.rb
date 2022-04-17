class Incident < ApplicationRecord
  CATEGORIES = ["Attempt", "Item Stolen", "Violent"]
  belongs_to :user
  has_many_attached :photos

  validates :address, :time, :date, :category, :authorities, presence: true
  validates :description, length: { maximum: 150 }
  validates :category, inclusion: { in: CATEGORIES }

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?

  before_save :add_neighborhood_after_creation

  private

  def add_neighborhood_after_creation
    longitude = self.longitude
    latitude = self.latitude
    apiKey = ENV['MAPBOX_API_KEY']

    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/#{longitude},#{latitude}.json?access_token=#{apiKey}"
    neighborhood = JSON.parse(URI.open(url).read)
    self.neighborhood = neighborhood["features"][1]["text"]
  end
end
