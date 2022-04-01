class Incident < ApplicationRecord
  CATEGORIES = ["Attempt", "Item Stolen", "Violent"]
  belongs_to :user
  has_many_attached :photos

  validates :address, :time, :date, :category, :authorities, :status, presence: true
  validates :description, length: { maximum: 150 }
  validates :category, inclusion: { in: CATEGORIES }
end
