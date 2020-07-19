import json, requests
url = 'https://api.foursquare.com/v2/venues/explore'

params = dict(
client_id='5B2JWHSLBC1GMIJQL2WEUO3C2GB0F2NKHFC4R0NVRSOINQGG',
client_secret='CVSR55SZI2XCI4ESQXTPET3TE5I4ACQX4NCPQC3QE10R30HG',
v='20180323',
near='220 Marjan',
query='noodles',
limit=5
)
resp = requests.get(url=url, params=params)
data = json.loads(resp.text)
print(data)