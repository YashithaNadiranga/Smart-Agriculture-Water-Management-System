from flask import Flask,render_template,request,send_file
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
import boto3
from flask import jsonify,make_response


application = Flask(__name__)
db = SQLAlchemy(application)



class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

db.create_all()

@application.route('/')
def route_home():
    return jsonify("Welcome To Water Management System")


@application.route("/plant/")
def plant_view():
    return make_response(jsonify({
        "id": "1",
        "plant_name": "Plant",
        "Water Level":"",
        
    }), 200)

@application.route("/plant/add")
def plant_add():
    id = request.args.get('id')
    name = request.args.get('name')
    return make_response(jsonify("plant Added"), 200)


@application.route("/users")
def add_item():
    user = User(username='admin', email='admin@example.com')
    db.session.add(user)
    db.session.commit()
    return "User Added"


if __name__ == '__main__':
    application.run(debug=True)