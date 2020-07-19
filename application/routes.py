from application import app, foursquare
from flask import render_template, request, json, Response

@app.route("/")
@app.route("/index", methods=["POST", "GET"])
def index():

    address = request.args.get("searchbar")
    venue_type = request.args.get("charity-type")
    transpo_type = request.args.get("transport")

    params_list = foursquare.returnParams(address, venue_type, transpo_type)

    print(address, venue_type, transpo_type)

    address = params_list[0]
    venue_type = params_list[1]
    rad = params_list[2]

    json_venues = foursquare.getVenues(foursquare.CLIENT_ID, foursquare.CLIENT_SECRET, address, foursquare.VERSION, venue_type, rad, foursquare.LIMIT)

    return render_template("index.html", index=True, json_data = json_venues)

def shutdown_server():
    func = request.environ.get('werkzeug.server.shutdown')
    if func is None:
        raise RuntimeError('Not running with the Werkzeug Server')
    func()

@app.route('/shutdown')
def shutdown():
    shutdown_server()
    return 'Server shutting down...'