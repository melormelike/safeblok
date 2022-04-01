
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

incident_1 = Incident.create!(user: User.first, category: "Item Stolen", authorities: "reported", status: "pending", address: "Canggu, Bali", date: Date.today, description: "in umalas", time: "8:00")
incident_2 = Incident.create!(user: User.last, category: "Item Stolen", authorities: "reported", status: "pending", address: "Ubud, Bali", date: Date.today, description: "in umalas", time: "8:00")
