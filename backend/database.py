import json
import pymongo
import certifi
class DB:
  def __init__(self, link, DBName, CollName):
    self.client = pymongo.MongoClient(link, tlsCAFile=certifi.where())
    self.db = self.client[DBName]
    self.usrCollection = self.db[CollName]

  def addUser(self, formData):
    formData = json.loads(formData)["formData"]
    userDict = {
      "_id":"",
      "usr":formData["usr"],
      "pass":formData["pass"]
    }
    if not self.usrCollection.find({"usr":userDict["usr"]}).count() > 0:
      userDict["_id"] = "temp"
      self.usrCollection.insert_one(userDict)
      return True
    else:
      return False

  def rem_user(self, user):
    
    return 0;
  def verify_user():

    return 0;
  def chng_user_pass():

    return 0;
  def chng_user_name():

    return 0;
