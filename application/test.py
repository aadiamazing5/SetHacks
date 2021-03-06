import json, requests

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

    for venue in results['response']['venues']:
        address = venue['location']['address']
        address_list.append(address)

    json_format = json.dumps(address_list)

    return json_format

print(getVenues(CLIENT_ID, CLIENT_SECRET, "New York, NY", VERSION, search_query, radius, LIMIT))