# class StatsController < ApplicationController
#   def index
#     @incidents = policy_scope(Incident)
#     # stats
#     @incidents_per_location = Incident.group(:address).count.sort_by{|_key, value| value}.reverse.first(5).to_h
#     @incidents_per_category = Incident.group(:category).count.sort_by{|_key, value| value}.reverse.first(5).to_h
#     @incidents_per_time = Incident.group(:time).count.sort_by{|_key, value| value}
#     @incidents_per_date = Incident.group(:date).count
#   end
# end
