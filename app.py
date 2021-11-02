from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import os

app = Flask(__name__, static_folder='/haas-avocados/build', static_url_path='')
cors = CORS(app)

@app.route('/api', methods=['GET'])
@cross_origin()
def index():
  return "success!"

@app.route('/')
@cross_origin()
def serve():
  return send_from_directory(app.static_folder, "index.html")

if __name__ == '__main__':
  app.run()
