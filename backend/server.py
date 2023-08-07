# Import flask and datetime module for showing date and time
from flask import Flask, jsonify, request, redirect
from flask.helpers import url_for
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin
from bson import ObjectId
import json
import os
 
# Initializing flask app
app = Flask(__name__)
cors = CORS(app)
app.config['MONGO_URI'] = 'mongodb+srv://rakshita:rakshita@cluster0.s48j0ve.mongodb.net/FeelifyDB'
app.config['CORS_Headers'] = 'Content-Type'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024 

mongo = PyMongo(app)

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)  # Convert ObjectId to string
        return json.JSONEncoder.default(self, o)

 
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

@app.route('/getSongs', methods = ['GET'])
def getSongs():
    currentCollection = mongo.db.Trending
    songs = currentCollection.find()

    song_list = []
    for song in songs:
        song_item = {
            "_id": str(song["_id"]),
            "song": song["song"],
            "song_name": song["song_name"],
            "song_id": song["song_id"],
            "thumbnail": song["thumbnail"],
            "duration": song["duration"],
            "emotion": song["emotion"]
        }
        song_list.append(song_item)

    return jsonify(song_list), 200
     
@app.route('/get_songs/<username>', methods=['GET'])
def get_songs(username):
    currentCollection = mongo.db.Personel
    songs = currentCollection.find({"username": username})
    song_list = []
    for song in songs:
        song_item = {
            "song_id": song["song_id"],
        }
        song_list.append(song_item)
        
    trendingCollection = mongo.db.Trending
    trending_songs = []
    for song in song_list:
        song_id_str = str(song["song_id"])  # Convert ObjectId to string
        song_data = trendingCollection.find_one({"song_id": song_id_str})
        if song_data:
            trending_songs.append(song_data)

    response = JSONEncoder().encode(trending_songs)
    return response, 200


UPLOAD_FOLDER = 'uploaded_images'  # Folder where the uploaded images will be stored
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
@app.route('/upload', methods=['POST'])
def upload_to_local_drive():

    if 'image' not in request.files:
        return jsonify({'error': 'No image part in the request'}), 400

    image_file = request.files['image']

    if image_file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if not os.path.exists(app.config['UPLOAD_FOLDER']):
        os.makedirs(app.config['UPLOAD_FOLDER'])
    # Save the uploaded image to the server
    if image_file:
        filename = image_file.filename
        filepath = os.path.join(app.config['UPLOAD_FOLDER'],'latest.jpg').replace('\\', '/')
        image_file.save(filepath)
        return jsonify({"message": "Image uploaded successfully", "file_path": filepath}), 200
    else:
        return jsonify({"error": "Failed to upload image"}), 500

     
# Running app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)