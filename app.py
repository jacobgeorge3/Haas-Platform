from datetime import datetime
from datetime import timedelta
from datetime import timezone

from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from backend import database
import os


app = Flask(__name__, static_folder='haas-avocados/build', static_url_path='')
# app.debug = True

# change this secret key in production
app.config['JWT_SECRET_KEY'] = 'secret-key'
# app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
# app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
jwt = JWTManager(app)

cors = CORS(app)
# db = database.DB()

@app.route('/api', methods=['GET'])
@cross_origin()
def index():
  return "success!"

@app.route('/login', methods=['POST'])
@cross_origin()
def login():
  username = request.json.get('username', None)
  password = request.json.get('password', None)

  if True: # db.verify_user(username, password):
    # uncomment to add last logged in data
    # db.login_user(username)

    # change username here to be the unique user id
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

  else:
    return jsonify({'msg': 'Invalid username or password'}), 401

@app.route('/signin', methods=['POST'])
@cross_origin()
def signin():
  username = request.json.get('username', None)
  password = request.json.get('password', None)
  if True: # verify signin (check for unique username/id)
    # db.addUser(username, password)
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token), 200
  else:
    return jsonify({ 'msg': 'Sign-in failed'}), 401

@app.route('/')
@cross_origin()
def serve():
  return send_from_directory(app.static_folder, "index.html")

@app.route("/protected", methods=['GET'])
@jwt_required()
def protected():
  # print('protected' + request.args['userID'])
  current_user = get_jwt_identity()
  return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
  app.run()
