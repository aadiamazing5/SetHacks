from application import app
from flask import render_template, request, json, Response

@app.route("/")
@app.route("/index")
def index():
    return render_template("index.html", index=True)

@app.route("/showMap")
def showMap():
    print("test")
    return render_template("index.html", index=True)