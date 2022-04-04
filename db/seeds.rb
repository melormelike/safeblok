
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "open-uri"

Incident.destroy_all
User.destroy_all

# User seed to test geocode
melike = User.create!(email: "melike@gmail.com", username: "Melike", password: "123456")
christina = User.create!(email: "christina@gmail.com", username: "Christina", password: "123456")
joana = User.create!(email: "joana@gmail.com", username: "Joana", password: "123456")

# Incident seed to test geocode


incident_3 = Incident.create!(user: User.last, category: "Item Stolen", authorities: "reported", status: "pending", address: "Ubud, Bali", date: Date.today, description: "in umalas", time: "8:00")
incident_4 = Incident.create!(user: User.last, category: "Attempt", authorities: "reported", status: "pending", address: "Ubud, Bali", date: Date.today, description: "in umalas", time: "8:00")
incident_1 = Incident.create!(user: User.first, category: "Item Stolen", authorities: "reported", status: "pending", address: "Canggu, Bali", date: Date.today, description: "Someone stole my phone while I was riding my scooter. The phone was in the pocket of bike. It was dark so I didn't see how they look like.", time: "20:00")
incident_2 = Incident.create!(user: User.last, category: "Item Stolen", authorities: "reported", status: "pending", address: "Ubud, Bali", date: Date.today, description: "While I was in the villa, two guys jumped into the garden and stole my laptop which was in the sunbed by the pool. ", time: "8:00")

file_1 = File.open(Rails.root.join("app/assets/images/pin.jpg"))
file_2 = File.open(Rails.root.join("app/assets/images/pin.jpg"))
incident_1.photos.attach(io: file_1, filename:'nes.png', content_type: 'image/png')
incident_1.photos.attach(io: file_2, filename:'nes.png', content_type: 'image/png')
file_3 = File.open(Rails.root.join("app/assets/images/yellowpin.jpg"))
file_4 = File.open(Rails.root.join("app/assets/images/yellowpin.jpg"))
incident_2.photos.attach(io: file_3, filename:'nes.png', content_type: 'image/png')
incident_2.photos.attach(io: file_4, filename:'nes.png', content_type: 'image/png')
