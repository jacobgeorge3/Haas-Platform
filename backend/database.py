import json
import pymongo
import certifi
import uuid
from backend import encryption
class DB:
  def __init__(self, link, DBName, userCollectionName, projCollectionName, HWSetCollectionName):
    self.client = pymongo.MongoClient(link, tlsCAFile=certifi.where())
    self.DB = self.client[DBName]
    self.usrCollection = self.DB[userCollectionName]
    self.projCollection = self.DB[projCollectionName]
    self.usrCollection = self.DB[userCollectionName]
    self.HWSetCollection = self.DB[HWSetCollectionName]
    self.crypt = encryption.encrypt()

  # ARGS: formDict. This is a python dictionary containing the user information.
  # RETURNS: True on success, and False on duplicate username. We can add more error codes for password requirement failiures later.
  def add_user(self, formDict):
    formDict["email"] = self.crypt.customEncrypt(formDict["email"], 3, 1)
    formDict["password"] = self.crypt.customEncrypt(formDict["password"], 3, 1)
    if not self.usrCollection.find({"email":formDict["email"]}).limit(1).count() > 0:
      id = str(uuid.uuid4())
      while self.usrCollection.find({"_id": id}).limit(1).count() > 0:
        id = str(uuid.uuid4())
      formDict["_id"] = id
      self.usrCollection.insert_one(formDict)
      print("add_user: ADDED USER ",formDict["email"], " SUCCESSFULLY")
      return True
    else:
      print("add_user: USERNAME UNAVAILABLE")
      return False

  def rem_user(self, userDict):
    userDict["email"] = self.crypt.customEncrypt(userDict["email"], 3, 1)
    if self.usrCollection.find({"_id":userDict["_id"]}).limit(1).count() > 0:
      self.usrCollection.remove({"_id":userDict["_id"]})
      print("rem_user: SUCCESS")
      return True
    else:
      print("rem_user: USER NOT FOUND")
      return False

  def verify_user(self, userDict):
    userDict["email"] = self.crypt.customEncrypt(userDict["email"], 3, 1)
    userDict["password"] = self.crypt.customEncrypt(userDict["password"], 3, 1)
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
    userDict["email"] = self.crypt.customEncrypt(userDict["email"], 3, 1)
    if not self.projCollection.find({"name": projDict["name"]}).limit(1).count() > 0:
      self.usrCollection.update_one({"email" : userDict["email"]}, {"$addToSet" : {"proj_list" : projDict["name"]}})
      projDict["user_list"].append(userDict["email"])
      self.projCollection.insert_one(projDict)
      print("create_project: PROJECT ", projDict["name"] , " CREATED")
      return True
    else:
      print("create_project: ID TAKEN")
      return False

  def join_existing_project(self, userDict, projDict):
    userDict["email"] = self.crypt.customEncrypt(userDict["email"], 3, 1)
    # $addToSet ensures no duplicates in reference sets.
    if self.projCollection.update({"name": projDict["name"]}, {"$addToSet" : {"user_list": userDict["email"]}})["nModified"] > 0:
      self.usrCollection.update_one({"email" : userDict["email"]}, {"$addToSet" : {"proj_list" : projDict["name"]}})
      print("join_existing_project: PROJECT JOINED.")
      return True
    elif self.usrCollection.find({"email": userDict["email"], "proj_list": [projDict["name"]]}).count() > 0:
      print("join_existing_project: USER HAS ALREADY JOINED THIS PROJECT")
      return False
    else:
      print("join_existing_project: PROJECT DOESNT EXISTS.")
      return False

  def rem_project(self, projDict):
    proj = self.projCollection.find({"name": projDict["name"]}, {"user_list": 1}).limit(1)
    if proj.count() > 0:
      for email in proj[0]["user_list"]:
        self.usrCollection.update({"email": email}, {"$pull": {"proj_list": projDict["name"]}})
      return True
    else:
      print("rem_project: PROJECT NO LONGER EXISTS.")
      return False

  def get_user_projects(self, userDict):
    userDict["email"] = self.crypt.customEncrypt(userDict["email"], 3, 1)
    proj_list = []
    usr = list(self.usrCollection.find({"email" : userDict["email"]}, {"proj_list": 1}).limit(1))[0]
    for proj in usr["proj_list"]:
      print(proj)
      proj_x = self.projCollection.find({"name": proj}, {"_id":0})
      if not proj_x.count() > 0:
        print("Proj not fo")
      else:
        proj_list.append(proj_x[0])
    return proj_list

  def edit_project(self, projDict):
    if self.projCollection.update({"name": projDict["name"]}, {"description":  projDict["description"]})["nModified"] > 0:
      print("edit_project: PROJECT UPDATED")
      return True
    else:
      print("join_existing_project: PROJECT DOESNT EXISTS.")
      return False

  
  def add_HWSet(self, HWSetDict):
    if not self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1).count() > 0:
      self.HWSetCollection.insert_one(HWSetDict)
      print("add_HWSet: ADDED HW SET", HWSetDict["name"], "SUCCESSFULLY")
      return True
    else:
      print("add_HWSet: FAILED TO ADD HW SET", HWSetDict["name"])
      return False
  def rem_HWSet(self, HWSetDict):
    if not self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1).count() > 0:
      self.HWSetColletion.remove({"name": HWSetDict["name"]})
      print("rem_HWSet: REMOVE HW SET", HWSetDict["name"], "SUCCESSFULLY")
      return True
    else:
      print("add_HWSet: FAILED TO REMOVE HW SET", HWSetDict["name"])
      return False
  
  def req_HW(self, num, projDict, HWSetDict):
    HW_set = self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1)
    if HW_set.count() > 0:
      print(HW_set[0])
      if HW_set[0]["available"] < num:
        print("req_HW: FAILED TO GET HW. NUMBER GREATER THAN AVAILABLE")
        return False
      else:
        if self.projCollection.update({"name": projDict["name"]}, {"$inc": {HWSetDict["name"]: num}})["nModified"] > 0:
          self.HWSetCollection.update({"name": HWSetDict["name"]}, {"$inc":{"available": -num}})
          print("req_HW: SUCCESS")
          return True
        else:
          print("req_HW: FAILED")
          return False
    else:
      print("FAIL")
      return False
  
  def checkIn_HW(self, num, projDict, HWSetDict):
    HW_set = self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1)
    if HW_set.count() > 0:
      if self.projCollection.update({"name": projDict["name"]}, {"$inc": {HWSetDict["name"]: num}})["nModified"] > 0:
        self.HWSetCollection.update({"name": HWSetDict["name"]}, {"$inc":{"available": num}})
        print("checkIn_HW: SUCCESS")
        return True
      else:
        print("checkIn_HW: FAILED")
        return False
    else:
      print("FAIL")
      return False

  def get_HWset_info(self, HWSetDict):
    HW_set = self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1)
    if HW_set.count() > 0:
      return HW_set[0]

  def add_capacity_HW(self, num, HWSetDict):
    HW_set = self.HWSetCollection.find({"name": HWSetDict["name"]}).limit(1)
    if HW_set.count() > 0:
      print(HW_set[0])
      if HW_set[0]["available"] < num:
        print("req_HW: FAILED TO GET HW. NUMBER GREATER THAN AVAILABLE")
        return False
      else:
        self.HWSetCollection.update({"name": HWSetDict["name"]}, {"$inc":{"capacity": -num}})
        return True
    else:
      print("FAIL")
      return False