import json, requests
url = 'https://api.foursquare.com/v2/venues/explore'
id = '5B2JWHSLBC1GMIJQL2WEUO3C2GB0F2NKHFC4R0NVRSOINQGG'
secret = 'CVSR55SZI2XCI4ESQXTPET3TE5I4ACQX4NCPQC3QE10R30HG'

params = dict(
client_id=id,
client_secret=secret,
v='20180323',
ll='40.7243,-74.0018',
query='coffee',
limit=1
)
resp = requests.get(url=url, params=params)
data = json.loads(resp.text)

address = data['response']['groups'][0]['items'][0]['venue']['location']['address']
