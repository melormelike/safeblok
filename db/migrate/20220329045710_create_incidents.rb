class CreateIncidents < ActiveRecord::Migration[6.1]
  def change
    create_table :incidents do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :category
      t.text :description
      t.boolean :authorities, default: false
      t.date :date
      t.time :time
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
