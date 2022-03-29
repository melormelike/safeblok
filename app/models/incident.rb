class Incident < ApplicationRecord
  TYPE = ["Attempt", "Item Stolen"]
  belongs_to :user
  has_many_attached :photos

  validates :address, :time, :date, :type, :authorities, :status, presence: true
  validates :description, length: { maximum: 150 }
  validates :type, inclusion: { in: TYPE }
end
