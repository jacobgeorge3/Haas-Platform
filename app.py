
from datetime import timedelta
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from backend import database
from backend import encryption
link = "mongodb+srv://ajj2357:1234@userinfo.5wos2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
DBName = "Database"
usrcollName = "users"
projcollname = "projects"
hwcoll = "HWSets"

app = Flask(__name__, static_folder='haas-avocados/build', static_url_path='')
# app.debug = True

# change this secret key in production
app.config['JWT_SECRET_KEY'] = 'secret-key'
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
# app.config['JWT_REFRESH_LIFESPAN'] = {'days': 30}
jwt = JWTManager(app)

cors = CORS(app)
crypt = encryption.encrypt()
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
  user_dict = {
    "email": email,
    "password": password,
  }
  print("email", user_dict["email"])
  if db.verify_user(user_dict):
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token, 
                    'msg': 'Logged in successfully!',
                    'status': 200})
  else:
    return jsonify({'msg': 'Invalid username or password',
                    'status': 403})

@app.route('/user/register', methods=['POST'])
@cross_origin()
def register():
  email = request.json.get('email', None)
  password = request.json.get('password', None)
  user_dict = {
    "email": email,
    "password": password,
    'proj_list': []
  }
  print("email", user_dict["email"])
  # verify signin (check for unique username/id)
  if db.add_user(user_dict): 
    # db.addUser(username, password)
    access_token = create_access_token(identity=email)
    return jsonify({'access_token': access_token,
                    'msg': 'New user created!',
                    'status': 200})
  else:
    return jsonify({'msg': 'Registration failed: Username unavailable',
                    'status': 403})

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
    return jsonify({'msg': 'Account for %s deleted'.format(email),
                    'status': 200})
  else:
    return jsonify({'msg': 'User not found',
                    'status': 403})

@app.route('/project/create', methods=['POST'])
@jwt_required()
@cross_origin()
def create_project():
  email = get_jwt_identity()
  name = request.json.get('name', None)
  description = request.json.get('description', None)

  # figure out what to do for project id
  user_dict = {
    'email': email
  }
  proj_dict = {
    'name': name,
    'description': description,
    'proj_id': '',
    'hwset1': 0,
    'hwset2': 0,
    'user_list': []
  }
  if db.create_project(user_dict, proj_dict):
    return jsonify({'msg': 'Project successfully created',
                    'status': 200 })
  else:
    return jsonify({'msg': 'Project name taken',
                    'status': 403})

# TODO: change this to only allow a user/admin to add another user to the project
@app.route('/project/join', methods=['POST'])
@jwt_required()
@cross_origin()
def join_project():
  email = get_jwt_identity()
  name = request.json.get('name', None)
  print(email,name)
  # figure out what to do for project id
  user_dict = {
    'email': email
  }
  proj_dict = {
    'name': name
  }
  if db.join_existing_project(user_dict, proj_dict):
    return jsonify({'msg': 'Project successfully joined',
                    'status': 200})
  else:
    return jsonify({'msg': 'Project not joined',
                    'status': 403})

# TODO: change this to only allow a user/admin to delete the project
@app.route('/project/remove', methods=['POST'])
@jwt_required()
@cross_origin()
def remove_project():
  name = 'Project: ' + request.json.get('name', None)
  proj_dict = {
    'name': name
  }
  print(proj_dict)
  if db.rem_project(proj_dict):
    return jsonify({'msg': 'Project successfully removed',
                    'status': 200})
  else:
    return jsonify({'msg': "Project doesn't exist",
                    'status': 403})

@app.route('/project/get-all', methods=['GET'])
@jwt_required()
@cross_origin()
def get_projects():
  email = get_jwt_identity()
  user_dict = {
    'email': email
  }
  proj_list = db.get_user_projects(user_dict)
  return jsonify(proj_list)

@app.route('/hw/checkout', methods=['POST'])
@jwt_required()
@cross_origin()
def checkout_hwset():
  name = request.json.get('name', None)
  hwset = request.json.get('hwset', None)
  amount = request.json.get('amount', None)
  proj_dict = {
    'name': name
  }
  hwset_dict = {
    'name': hwset
  }
  if db.req_HW(amount, proj_dict, hwset_dict):
    return jsonify({'msg': 'Hardware added successfully',
                    'status': 200})
  else:
    return jsonify({'msg': 'Not enough hardware in this set',
                    'status': 406})

@app.route('/hw/checkin', methods=['POST'])
@jwt_required()
@cross_origin()
def checkin_hwset():
  name = request.json.get('name', None)
  hwset = request.json.get('hwset', None)
  amount = request.json.get('amount', None)
  proj_dict = {
    'name': name
  }
  hwset_dict = {
    'name': hwset,
  }
  if db.checkIn_HW(amount, proj_dict, hwset_dict):
    return jsonify({'msg': 'Hardware checked in successfully.',
                    'status': 200})
  else:
    return jsonify({'msg': 'Hardware not checked in',
                    'status': 406})

@app.route('/hw/get', methods=['GET'])
@jwt_required()
@cross_origin()
def get_hwset():
  hwset = request.args.get('name', None)
  hwset_dict = {
    'name': hwset,
  }
  hwset = db.get_HWset_info(hwset_dict)
  return jsonify({'hwset': hwset,
                  'status': 200})

@app.route('/')
@cross_origin()
def serve():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/dashboard')
@cross_origin()
def serve1():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/logout')
@cross_origin()
def serve2():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/login')
@cross_origin()
def serve3():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/register')
@cross_origin()
def serve4():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/projects')
@cross_origin()
def serve5():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/addproject')
@cross_origin()
def serve6():
  return send_from_directory(app.static_folder, "index.html")

@app.route('/datasets')
@cross_origin()
def serve7():
  return send_from_directory(app.static_folder, "index.html")

@app.route("/protected", methods=['GET'])
@jwt_required()
def protected():
  # print('protected' + request.args['userID'])
  current_user = get_jwt_identity()
  return jsonify(logged_in_as=current_user), 200

if __name__ == '__main__':
  app.run()
