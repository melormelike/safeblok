
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require "open-uri"

puts "Destroying all data"
Incident.destroy_all
User.destroy_all

# User seed to test geocode
puts "Creating users"
melike = User.create!(email: "melike@gmail.com", username: "Melike", password: "123456", admin: true)
christina = User.create!(email: "christina@gmail.com", username: "Christina", password: "123456")
joana = User.create!(email: "joana@gmail.com", username: "Joana", password: "123456")
puts "Created #{User.count} users"

# Incident seed to test geocode

incident_1 = Incident.create!(user: User.first, category: "Item Stolen", authorities: true, address: "Canggu, Bali", date: Date.today - 1.day, description: "Someone stole my phone while I was riding my scooter. The phone was in the pocket of bike. It was dark so I didn't see how they look like.", time: "20:00")
incident_2 = Incident.create!(user: User.last, category: "Item Stolen", authorities: true, address: "Ubud, Bali", date: Date.today - 1.day, description: "While I was in the villa, two guys jumped into the garden and stole my laptop which was in the sunbed by the pool. ", time: "8:00")
incident_3 = Incident.create!(user: User.last, category: "Item Stolen", authorities: true, address: "Ubud, Bali", date: Date.today - 2.day, description: "in umalas", time: "8:00")
incident_4 = Incident.create!(user: User.last, category: "Attempt", authorities: true, address: "Ubud, Bali", date: Date.today - 3.day, description: "in umalas", time: "8:00")
incident_5 = Incident.create!(user: User.last, category: "Item Stolen", authorities: true, address: "Kuta, Bali", date: Date.today - 1.day, description: "Someone at night stole my most beloved helmet out from scotter in Kuta.", time: "03:00")
incident_6 = Incident.create!(user: User.last, category: "Item Stolen", authorities: true, address: "Kuta, Bali", date: Date.today - 3.day, description: "To the 2 guys who had ripped my necklace on a bloody driving motorbike and stole it on Sunday night in Jalan Bumbak.", time: "20:35")
incident_7 = Incident.create!(user: User.last, category: "Attempt", authorities: true, address: "Canggu, Bali", date: Date.today, description: "I was walking along the street with mobile phone in my hand and a boy in black hat tried rip it from my hands and run away. It was close to Indomarket", time: "21:15")
incident_8 = Incident.create!(user: User.last, category: "Attempt", authorities: true, address: "Ubud, Bali", date: Date.today, description: "Our friend got stabbed and robbed in the parking of Monkey Forest in Ubud.The case has been already reported to the police.", time: "19:00")
incident_9 = Incident.create!(user: User.last, category: "Item Stolen", authorities: true, address: "Ubud, Bali", date: Date.today, description: "I was robbed yesterday, ma bag with phone and card was taken when I was driving home by 2 men on bike.", time: "8:00")
incident_10 = Incident.create!(user: User.last, category: "Attempt", authorities: true, address: "Seminyak, Bali", date: Date.today, description: "I got robbed in seminyak , 2 young guys stole my handphone samsung 21, while i was lookin google maps, they drive pass an took it.", time: "20:00")

file_1 = File.open(Rails.root.join("app/assets/images/pin.jpg"))
file_2 = File.open(Rails.root.join("app/assets/images/pin.jpg"))
incident_1.photos.attach(io: file_1, filename:'nes.png', content_type: 'image/png')
incident_1.photos.attach(io: file_2, filename:'nes.png', content_type: 'image/png')
file_3 = File.open(Rails.root.join("app/assets/images/yellowpin.jpg"))
file_4 = File.open(Rails.root.join("app/assets/images/yellowpin.jpg"))
incident_2.photos.attach(io: file_3, filename:'nes.png', content_type: 'image/png')
incident_2.photos.attach(io: file_4, filename:'nes.png', content_type: 'image/png')
puts "Created #{Incident.count} incidents"
