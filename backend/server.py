# Import flask and datetime module for showing date and time
from flask import Flask, jsonify, request, redirect
from flask.helpers import url_for
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

 
# Initializing flask app
app = Flask(__name__)
cors = CORS(app)
app.config['MONGO_URI'] = 'mongodb+srv://rakshita:rakshita@cluster0.s48j0ve.mongodb.net/FeelifyDB'
app.config['CORS_Headers'] = 'Content-Type'

mongo = PyMongo(app)

 
# Route for seeing a data
@app.route('/', methods = ['GET'])
def retrieveAll():
    holder = list()
    currentCollection = mongo.db.User
    for i in currentCollection.find():
        holder.append({'firstname':i['first_name'], 'lastname' : i['last_name']})
    return jsonify(holder)
 
@app.route('/checkUser', methods = ['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def checkUser():
    currentCollection = mongo.db.User
    username = request.json['username']
    password = request.json['password']
    user = currentCollection.find_one({"$and":[{"username" : username},{"password":password}]})
    
    if not user:
        return jsonify({"error": "Invalid username/password"}), 401

    if user["password"] == password:
        return jsonify({"success": True}), 200


@app.route('/addUser', methods = ['POST'])
def addUser():
    currentCollection = mongo.db.User
    first_name = request.json['first_name']
    last_name = request.json['last_name']
    username = request.json['username']
    password = request.json['password']
    email = request.json['email']
    currentCollection.insert_one({'first_name' : first_name, 'last_name' : last_name ,'password': password ,'email' :email, 'username':username}) ;
    return jsonify({"success": True, "message": "User added successfully"})
     

     
# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)