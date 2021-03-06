from application import app, foursquare
from flask import render_template, request, json, Response
from flask_googlemaps import GoogleMaps
from flask_googlemaps import Map

# @app.route("/")
# @app.route("/index")
# def index():
#     return render_template("index.html", index=True)

@app.route("/")
@app.route("/index", methods=["POST", "GET"])
def index():

    address = request.args.get("query")
    venue_type = request.args.get("type")
    transpo_type = request.args.get("transport")

    if address is not None:
        params_list = foursquare.returnParams(address, venue_type, transpo_type)
        address = params_list[0]
        venue_type = params_list[1]
        rad = params_list[2]
        json_venues = foursquare.getVenues(foursquare.CLIENT_ID, foursquare.CLIENT_SECRET, address, foursquare.VERSION, venue_type, rad, foursquare.LIMIT)
        print(json_venues)
        return render_template("index.html", index=True, json_data=json_venues, queried="true")

    return render_template("index.html", index=True, queried="false", json_data={"addresses": []})




def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

<<<<<<< HEAD

=======
>>>>>>> master
@app.route('/shutdown')
def shutdown():
    shutdown_server()
    return 'Server shutting down...'
