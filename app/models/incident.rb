class Incident < ApplicationRecord
  CATEGORIES = ["Attempt", "Item Stolen", "Violent"]
  belongs_to :user
  has_many_attached :photos

  validates :address, :time, :date, :category, :authorities, presence: true
  validates :description, length: { maximum: 150 }
  validates :category, inclusion: { in: CATEGORIES }

  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
