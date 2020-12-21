require 'json'
require 'open-uri'
require 'net/http'

uri = URI('https://ghibliapi.herokuapp.com/people')
Net::HTTP.get(uri) # => String


# Using the Studio Ghibli API (https://ghibliapi.herokuapp.com),
# perform the scraping of all People objects belonging to the "Human" Species, optimizing for speed
# of execution.

url = 'https://ghibliapi.herokuapp.com'
item_serialized = open(url).read
people = JSON.parse(item_serialized)

puts people
