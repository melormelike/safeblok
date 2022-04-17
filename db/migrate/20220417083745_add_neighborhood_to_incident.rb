class AddNeighborhoodToIncident < ActiveRecord::Migration[6.1]
  def change
    add_column :incidents, :neighborhood, :string
  end
end
