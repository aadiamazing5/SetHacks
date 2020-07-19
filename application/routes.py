from application import app
from flask import render_template, request, json, Response
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

# @app.route("/")
# @app.route("/index")
# def index():
#     return render_template("index.html", index=True)

@app.route("/")
def mapview():
    # creating a map in the view
    mymap = Map(
        identifier="view-side",
        lat=40,
        lng=-150,
        #markers=[(37.4419, -122.1419)]
    )
    sndmap = Map(
        identifier="sndmap",
        lat=40,
        lng=-150,
        # markers=[
        #   {
        #      'icon': 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        #      'lat': 37.4419,
        #      'lng': -122.1419,
        #      'infobox': "<b>Hello World</b>"
        #   },
        #   {
        #      'icon': 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        #      'lat': 37.4300,
        #      'lng': -122.1400,
        #      'infobox': "<b>Hello World from other place</b>"
        #   }
        # ]
    )
    return render_template('index.html', mymap=mymap, sndmap=sndmap, index=True)