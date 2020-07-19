from flask import Flask
from flask_googlemaps import GoogleMaps

app = Flask(__name__)
GoogleMaps(app, key="AIzaSyDtXwbSQsAINxOwiYxF6kuDvbZFm0ADGr8")

from application import routes

#app.config['GOOGLEMAPS_KEY'] = "AIzaSyDtXwbSQsAINxOwiYxF6kuDvbZFm0ADGr8"