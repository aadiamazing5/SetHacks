import json, requests
from geopy.geocoders import Nominatim

CLIENT_ID = '5B2JWHSLBC1GMIJQL2WEUO3C2GB0F2NKHFC4R0NVRSOINQGG'
CLIENT_SECRET = 'CVSR55SZI2XCI4ESQXTPET3TE5I4ACQX4NCPQC3QE10R30HG'
VERSION = '20180604'


longitude = -74.0156573
latitude = 40.7151482
search_query = 'homeless shelter'
radius = 2000
LIMIT = 5

def getVenues(CLIENT_ID, CLIENT_SECRET, city, VERSION, search_query, radius, LIMIT):
    address_list = []

    url = 'https://api.foursquare.com/v2/venues/search?client_id={}&client_secret={}&near={}&v={}&query={}&radius={}&limit={}'.format(CLIENT_ID, CLIENT_SECRET, city, VERSION, search_query, radius, LIMIT)

    results = requests.get(url).json()
    if "venues" in results['response']:
        for venue in results['response']['venues']:
            if "address" in venue['location']:
                address = venue['location']['address']
                address_list.append(address)

    json_format = json.dumps({"addresses": address_list})

    return {"addresses": address_list}


def returnParams(search, venue_type, transpo):
    returnList = []
    radius = 0
    if transpo == "Car/Taxi":
        radius = 100000
    elif transpo == "Bus":
        radius = 50000
    elif transpo == "Biking":
        radius = 25000
    elif transpo == "Walking":
        radius = 4000
    else:
        radius = 25000
        
    returnList.append(search)
    returnList.append(venue_type)
    returnList.append(radius)

    return returnList



def returnParams(search, venue_type, transpo):
    returnList = []
    radius = 0
    if transpo == "Car/Taxi":
        radius = 100000
    elif transpo == "Bus":
        radius = 50000
    elif transpo == "Biking":
        radius = 25000
    elif transpo == "Walking":
        radius = 4000
    else:
        radius = 25000
        
    returnList.append(search)
    returnList.append(venue_type)
    returnList.append(radius)

    return returnList

def addressToCoords(address):
    lat_long = []
    geolocator = Nominatim(user_agent="foursquare_agent")
    location = geolocator.geocode(address)
    latitude = location.latitude
    longitude = location.longitude
    lat_long.append(latitude)
    lat_long.append(longitude)
    return lat_long




