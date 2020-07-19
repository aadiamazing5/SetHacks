from application import app
from flask import render_template, request, json, Response

@app.route("/")
@app.route("/index", methods=["POST", "GET"])
def index():
    trigger = request.form.get("trigger")
    if trigger == 1:
        print(request.form.get("trigger"))
        print(request.form.get("transportation"))
        print(request.form.get("type"))
        print(request.form.get("query"))
    return render_template("index.html", index=True)