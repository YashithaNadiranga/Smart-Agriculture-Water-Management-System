from flask import Flask,render_template,request,send_file
from flask.json import JSONEncoder, dumps
from flask_sqlalchemy import SQLAlchemy
from werkzeug.utils import secure_filename
from flask import jsonify,make_response
from flask_cors import CORS,cross_origin
from flask_marshmallow import Marshmallow

application = Flask(__name__)
application.config['SQLALCHEMY_DATABASE_URI'] = ""
db = SQLAlchemy(application)
ma = Marshmallow(application)
CORS(application)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

class Plant(db.Model):
    pid = db.Column(db.String(30), primary_key = True)
    pname = db.Column(db.String(30),unique=True, nullable=False)
    stype = db.Column(db.String(30),unique=True, nullable=False)
    smois = db.Column(db.String(30),unique=True, nullable=False)

db.create_all()

class plantSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Plant
        load_instance = True


@application.route('/')
def route_home():
    return jsonify("Welcome To Water Management System")


@application.route("/getplants/", methods=["GET"])
@cross_origin()
def plant_view():
    all = Plant.query.all()
    plant_schema = plantSchema(many=True)
    output = plant_schema.dump(all)
    return jsonify({'Plant' : output})

@application.route("/plant/add/",  methods=["GET","POST"])
@cross_origin()
def plant_add():
    if request.method =='POST':
        pid = request.json.get('pid')
        pname = request.json.get('pname')
        stype = request.json.get('stype')
        smois = request.json.get('smois')
        
        pl = Plant(pid = pid , pname = pname, stype = stype, smois = smois)
        db.session.add(pl)
        db.session.commit() 
        return make_response(jsonify(success= "success"), 200)
    else:
        return make_response(jsonify(""), 200)

@application.route("/plant/update/",  methods=["GET","PUT"])
@cross_origin()
def plant_update():
    if request.method =='PUT':
        pid = request.json.get('pid')
        pname = request.json.get('pname')
        stype = request.json.get('stype')
        smois = request.json.get('smois')

        plant_n = Plant.query.filter_by(pid=pid).first()
        plant_n.pname = pname
        plant_n.stype = stype
        plant_n.smois = smois
        db.session.commit()
        return make_response(jsonify(success= "success"), 200)
    else:
        return make_response(jsonify(""), 200)

@application.route("/plant/delete/",  methods=["GET","DELETE"])
@cross_origin()
def plant_delete():
    if request.method =='DELETE':
        pid = request.args.get('pid')
        Plant.query.filter(Plant.pid == pid).delete()
        db.session.commit() 
        print(pid)
        return make_response(jsonify(success= "success"), 200)
    else:
        return make_response(jsonify(""), 200)

@application.route("/dashboard/getallcount/",  methods=["GET"])
@cross_origin()
def get_dashboard():
    cou = db.session.query(Plant.pid).count()
    return make_response(jsonify(plantcount= cou), 200)

@application.route("/plant/getlastid/",  methods=["GET"])
@cross_origin()
def get_lastid():
    ls = Plant.query.order_by(Plant.pid.desc()).first()
    cou = 0
    if ls == None :
        cou = 0
    else:
        cou = ls.pid
    return jsonify({'lastid' : int(cou)+1})
    

if __name__ == '__main__':
    application.run(debug=True)