require 'json'
require 'open-uri'
require 'net/http'
require 'pry'

uri = URI.parse('https://ghibliapi.herokuapp.com/people')
response = Net::HTTP.get_response(uri)
mammals = JSON.parse(response.body)
# Pry::ColorPrinter.pp(mammals)
humans = []
count = 0

def get_response(url)
  species_uri = URI.parse(url)
  response = Net::HTTP.get_response(species_uri)
  JSON.parse(response.body)
end

loop do
  human_url = mammals[count]["species"]
  species_response = get_response(mammals[count]['species'])
  if species_response["name"] == 'Human'
    mammals.each do |mammal|
      humans << mammal if mammal['species'] == human_url
    end
    break
  end
  count += 1
end

Pry::ColorPrinter.pp(humans)

# loop do
#   species_uri = URI.parse(mammals[count]["species"])
#   response = Net::HTTP.get_response(species_uri)
#   species_response = JSON.parse(response.body)
#   if species_response["name"] == 'Human'
#     human = species_response
#     people = human["people"]
#     people.each do |person|
#       person_uri = URI.parse(person)
#       person_response = Net::HTTP.get_response(person_uri)
#       person_json = JSON.parse(person_response.body)
#       humans << person_json
#     end
#     break
#   end
#   count += 1
# end

# mammals.each do |mammal|
#   species = mammal["species"]
#   species_uri = URI.parse(species)
#   response = Net::HTTP.get_response(species_uri)
#   species_response = JSON.parse(response.body)
#   if species_response["name"] == "Human"
#     humans << species_response
#   end
# end
