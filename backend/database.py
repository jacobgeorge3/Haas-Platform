import json
import pymongo
import certifi
import uuid
class DB:
  def __init__(self, link, DBName, userCollectionName, projCollectionName, HWSetCollectionName):
    self.client = pymongo.MongoClient(link) #, tlsCAFile=certifi.where())
    self.DB = self.client[DBName]
    self.usrCollection = self.DB[userCollectionName]
    self.projCollection = self.DB[projCollectionName]
    self.usrCollection = self.DB[userCollectionName]
    self.HWSetColletion = self.DB[HWSetCollectionName]

  # ARGS: formDict. This is a python dictionary containing the user information.
  # RETURNS: True on success, and False on duplicate username. We can add more error codes for password requirement failiures later.
  def add_user(self, formDict):
    if not self.usrCollection.find({"email":formDict["email"]}).limit(1).count() > 0:
      id = str(uuid.uuid4())
      while self.usrCollection.find({"_id": id}).limit(1).count() > 0:
        id = str(uuid.uuid4())
      formDict["_id"] = id
      self.usrCollection.insert_one(formDict)
      print("success",formDict)
      #print("add_user: SUCCESS")
      return True
    else:
      #print("add_user: USERNAME UNAVAILABLE")
      print("failure", formDict)
      return False
    
  def rem_user(self, userDict):
    if self.usrCollection.find({"_id":userDict["_id"]}).limit(1).count() > 0:
      self.usrCollection.remove({"_id":userDict["_id"]})
      print("rem_user: SUCCESS")
      return True
    else:
      print("rem_user: USER NOT FOUND")
      return False

  def verify_user(self, userDict):
    usrList = list(self.usrCollection.find({"email":userDict["email"]}).limit(1))
    if len(usrList) == 0:
      print("verify_user: USER NOT FOUND")
      return False
    else:
      usr = usrList[0]
      if usr["password"] == userDict["password"]:
        return True
      else:
        return False

  
  
  
  
  
  
  def create_project(self, userDict, projDict):
    if not self.projCollection.find({"proj_id": projDict["proj_id"]}).limit(1).count() > 0:
      self.usrCollection.update_one({"email" : userDict["email"]}, {"$push" : {"proj_list" : projDict["proj_id"]}})
      projDict["user_list"].append(userDict["user_id"])
      self.projCollection.insert_one(projDict)
    else:
      print("create_project: ID TAKEN")
      
  
  def join_existing_project(self, userDict, projDict):
    if self.projCollection.update({"proj_id": projDict["proj_id"]}, {"$push" : {"user_list": userDict["user_id"]}})["nModified"] > 0:
      self.usrCollection.update_one({"email" : userDict["email"]}, {"$push" : {"proj_list" : projDict["proj_id"]}})
      #print("join_existing_project: PROJECT JOINED.")
    else:
      print("join_existing_project: PROJECT DOESNT EXISTS.")

 
  def rem_project(self, projDict):
    proj = self.projCollection.find({"proj_id": projDict["proj_id"]}, {"user_list": 1}).limit(1)
    if proj.count() > 0:
      for user_id in proj[0]["user_list"]:
        self.usrCollection.update({"user_id": user_id}, {"$pull": {"proj_list": projDict["proj_id"]}})
    else:
      print("rem_project: PROJECT NO LONGER EXISTS.")
      return False
  
  def get_user_project(self, userDict):
    usr_projs = list(self.usrCollection.find({"email" : userDict["email"]}, {"proj_list": 1}).limit(1))[0]
    return usr_projs["proj_list"]
  
  
  
  
  
  
  def init_hwSets(self):
    return 0
  def add_HW():

    return 0
  def remove_HW():
    return 0
  def request_HW(self, num, HWSetDict):
    return 0