
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from backend import database

link = "mongodb+srv://ajj2357:1234@userinfo.5wos2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
DBName = "Database"
usrcollName = "users"
projcollname = "projects"
hwcoll = "HWSets"

app = Flask(__name__, static_folder='haas-avocados/build', static_url_path='')
# app.debug = True

# change this secret key in production
app.config['JWT_SECRET_KEY'] = 'secret-key'
# app.config['JWT_ACCESS_LIFESPAN'] = {'hours': 24}
# app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
jwt = JWTManager(app)

cors = CORS(app)
db = database.DB(link, DBName, usrcollName, projcollname, hwcoll)

@app.route('/api', methods=['GET'])
@cross_origin()
def index():
  return "success!"

@app.route('/user/login', methods=['POST'])
@cross_origin()
def login():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
<<<<<<< HEAD

  if True: # db.verify_user(username, password):
    # uncomment to add last logged in data
    # db.login_user(username)

    # change username here to be the unique user id
    access_token = create_access_token(identity=username)
    return jsonify(access_token=access_token)

=======
  user_dict = {
    "email": email,
    "password": password,
  }
  if db.verify_user(user_dict):
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
>>>>>>> 6c58347c87d9db86f56275edcdc7ba1cb51d7467
  else:
    return jsonify({'msg': 'Invalid username or password'}), 403

@app.route('/user/register', methods=['POST'])
@cross_origin()
def signin():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  user_dict = {
    "email": email,
    "password": password,
  }
  # verify signin (check for unique username/id)
  if db.add_user(user_dict): 
    # db.addUser(username, password)
    access_token = create_access_token(identity=email)
    return jsonify(access_token=access_token), 200
  else:
    return jsonify({ 'msg': 'Sign-in failed: Username unavailable'}), 403

@app.route('/user/remove', methods=['POST'])
@cross_origin()
def remove_user():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  user_dict = {
    "email": email,
    "password": password,
  }
  if db.rem_user(user_dict): 
    return jsonify({ 'msg': 'Account for %s deleted'.format(email)}), 200
  else:
    return jsonify({ 'msg': 'User not found'}), 403

@app.route('/project/create', methods=['POST'])
@jwt_required()
@cross_origin()
def create_project():
  email = get_jwt_identity()
  name = 'Project: ' + request.json.get('name', None)
  description = request.json.get('description', None)
  # figure out what to do for project id
  user_dict = {
    'email': email
  }
  proj_dict = {
    'name': name,
    'description': description,
    'user_list': []
  }
  if db.create_project(user_dict, proj_dict):
    return jsonify({ 'msg': 'Project successfully created' }), 200
  else:
    return jsonify({ 'msg': 'Project name taken' }), 403

# TODO: change this to only allow a user/admin to add another user to the project
@app.route('/project/join', methods=['POST'])
@jwt_required()
@cross_origin()
def join_project():
  email = get_jwt_identity()
  name = 'Project: ' + request.json.get('name', None)
  # figure out what to do for project id
  user_dict = {
    'email': email
  }
  proj_dict = {
    'name': name
  }
  if db.join_existing_project(user_dict, proj_dict):
    return jsonify({ 'msg': 'Project successfully joined' }), 200
  else:
    return jsonify({ 'msg': "Project doesn't exist" }), 403

# TODO: change this to only allow a user/admin to delete the project
@app.route('/project/remove', methods=['POST'])
@jwt_required()
@cross_origin()
def remove_project():
  email = get_jwt_identity()
  name = 'Project: ' + request.json.get('name', None)
  # figure out what to do for project id
  user_dict = {
    'email': email
  }
  proj_dict = {
    'name': name
  }
  if db.rem_project(user_dict, proj_dict):
    return jsonify({ 'msg': 'Project successfully removed' }), 200
  else:
    return jsonify({ 'msg': "Project doesn't exist" }), 403

@app.route('/project/get-all', methods=['GET'])
@jwt_required()
@cross_origin()
def get_projects():
  email = get_jwt_identity()
  user_dict = {
    'email': email
  }
  return jsonify({ 'projects': db.get_user_project(user_dict) })

@app.route('/hw/checkout', methods=['POST'])
@jwt_required()
@cross_origin()
def checkout_hwset():
  name = request.json.get('name', None)
  proj_dict = {
    'name': name
  }
  db.add_HW()

@app.route('/hw/checkin', methods=['POST'])
@jwt_required()
@cross_origin()
def checkin_hwset():
  name = request.json.get('name', None)
  proj_dict = {
    'name': name
  }
  db.remove_HW()

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
