import pymongo
import uuid
# import certifi # Not needed for local non-TLS mongo, add back if cloud requires it
from backend import encryption

class DB:
    def __init__(self, uri, db_name):
        # We can drop the detailed collection names arguments and just hardcode them or config them
        # matching the original `app.py` variables
        self.client = pymongo.MongoClient(uri)
        self.DB = self.client[db_name]
        self.usrCollection = self.DB["users"]
        self.projCollection = self.DB["projects"]
        self.HWSetCollection = self.DB["HWSets"]
        
        # Initialize Default Hardware Sets
        self._init_hw_sets()
        
        self.crypt = encryption.encrypt()

    def _init_hw_sets(self):
        # Helper to avoid cluttering __init__
        self.add_HWSet({"name": "hwset1", "capacity": 100, "available": 100})
        self.add_HWSet({"name": "hwset2", "capacity": 1000, "available": 1000})

    def add_user(self, formDict):
        # removed email encryption
        formDict["password"] = self.crypt.hash_password(formDict["password"])
        
        if self.usrCollection.count_documents({"email": formDict["email"]}, limit=1) == 0:
            id = str(uuid.uuid4())
            while self.usrCollection.count_documents({"_id": id}, limit=1) > 0:
                id = str(uuid.uuid4())
            formDict["_id"] = id
            self.usrCollection.insert_one(formDict)
            print("add_user: ADDED USER ", formDict["email"], " SUCCESSFULLY")
            return True
        else:
            print("add_user: USERNAME UNAVAILABLE")
            return False

    def rem_user(self, userDict):
        # removed email encryption
        if self.usrCollection.count_documents({"_id": userDict["_id"]}, limit=1) > 0:
            self.usrCollection.delete_one({"_id": userDict["_id"]})
            print("rem_user: SUCCESS")
            return True
        else:
            print("rem_user: USER NOT FOUND")
            return False

    def verify_user(self, userDict):
        # removed email encryption
        # removed password encryption (we check hash now)
        usrList = list(self.usrCollection.find({"email": userDict["email"]}).limit(1))
        if len(usrList) == 0:
            print("verify_user: USER NOT FOUND")
            return False
        else:
            usr = usrList[0]
            if self.crypt.check_password(userDict["password"], usr["password"]):
                return True
            else:
                return False

    def create_project(self, userDict, projDict):
        # removed email encryption
        if self.projCollection.count_documents({"name": projDict["name"]}, limit=1) == 0:
            self.usrCollection.update_one({"email": userDict["email"]}, {"$addToSet": {"proj_list": projDict["name"]}})
            projDict["user_list"].append(userDict["email"])
            self.projCollection.insert_one(projDict)
            print("create_project: PROJECT ", projDict["name"], " CREATED")
            return True
        else:
            print("create_project: ID TAKEN")
            return False

    def join_existing_project(self, userDict, projDict):
        # removed email encryption
        if self.projCollection.update_one({"name": projDict["name"]}, {"$addToSet": {"user_list": userDict["email"]}}).modified_count > 0:
            self.usrCollection.update_one({"email": userDict["email"]}, {"$addToSet": {"proj_list": projDict["name"]}})
            print("join_existing_project: PROJECT JOINED.")
            return True
        elif self.usrCollection.count_documents({"email": userDict["email"], "proj_list": projDict["name"]}) > 0:
            print("join_existing_project: USER HAS ALREADY JOINED THIS PROJECT")
            return False
        else:
            print("join_existing_project: PROJECT DOESNT EXISTS.")
            return False

    def rem_project(self, projDict):
        proj = list(self.projCollection.find({"name": projDict["name"]}, {"user_list": 1}).limit(1))
        if len(proj) > 0:
            for email in proj[0]["user_list"]:
                self.usrCollection.update_one({"email": email}, {"$pull": {"proj_list": projDict["name"]}})
            self.projCollection.delete_one({"name": projDict["name"]})
            return True
        else:
            return False

    def get_user_projects(self, userDict):
        # removed email encryption
        proj_list = []
        usr_cursor = self.usrCollection.find({"email": userDict["email"]}, {"proj_list": 1}).limit(1)
        usr_list = list(usr_cursor)
        if not usr_list:
             return []
        
        usr = usr_list[0]
        # Handle case where user has no project list
        if "proj_list" not in usr:
            return []
            
        for proj in usr["proj_list"]:
            print(proj)
            proj_x = list(self.projCollection.find({"name": proj}, {"_id": 0}))
            if len(proj_x) == 0:
                print("Proj not found")
            else:
                proj_list.append(proj_x[0])
        return proj_list

    def edit_project(self, projDict):
        if self.projCollection.update_one({"name": projDict["name"]}, {"$set": {"description": projDict["description"]}}).modified_count > 0:
            print("edit_project: PROJECT UPDATED")
            return True
        else:
            print("edit_project: PROJECT DOESNT EXISTS.")
            return False

    def add_HWSet(self, HWSetDict):
        if self.HWSetCollection.count_documents({"name": HWSetDict["name"]}, limit=1) == 0:
            self.HWSetCollection.insert_one(HWSetDict)
            print("add_HWSet: ADDED HW SET", HWSetDict["name"], "SUCCESSFULLY")
            return True
        else:
            print("add_HWSet: FAILED TO ADD HW SET", HWSetDict["name"])
            return False

    def rem_HWSet(self, HWSetDict):
        if self.HWSetCollection.count_documents({"name": HWSetDict["name"]}, limit=1) > 0:
            self.HWSetCollection.delete_one({"name": HWSetDict["name"]})
            print("rem_HWSet: REMOVE HW SET", HWSetDict["name"], "SUCCESSFULLY")
            return True
        else:
            print("rem_HWSet: FAILED TO REMOVE HW SET", HWSetDict["name"])
            return False

    def req_HW(self, num, projDict, HWSetDict):
        # Using atomic update with condition to handle concurrency better
        # This replaces the logic of (check -> update) which is racy
        # $inc with query condition ensuring available >= num
        
        result = self.HWSetCollection.update_one(
            {"name": HWSetDict["name"], "available": {"$gte": num}},
            {"$inc": {"available": -num}}
        )
        
        if result.modified_count > 0:
            # We successfully reserved hardware. Now update the project.
            # If this fails, we have a consistency issue (hardware reserved but not assigned to project)
            # This is where transactions would be useful in future.
            self.projCollection.update_one(
                {"name": projDict["name"]}, 
                {"$inc": {HWSetDict["name"]: num}}
            )
            print("req_HW: SUCCESS")
            return True
        else:
             print("req_HW: FAILED TO GET HW. NOT ENOUGH AVAILABLE OR SET NOT FOUND")
             return False

    def checkIn_HW(self, num, projDict, HWSetDict):
        # Similar atomic check: ensure project HAS the hardware to check in
        # Dynamic field name in query requires building dict
        query = {"name": projDict["name"]}
        query[HWSetDict["name"]] = {"$gte": num}
        
        result = self.projCollection.update_one(
            query,
            {"$inc": {HWSetDict["name"]: -num}}
        )
        
        if result.modified_count > 0:
            self.HWSetCollection.update_one(
                {"name": HWSetDict["name"]}, 
                {"$inc": {"available": num}}
            )
            print("checkIn_HW: SUCCESS")
            return True
        else:
            print("checkIn_HW: FAILED OR NOT ENOUGH HW CHECKED OUT")
            return False

    def get_HWset_info(self, HWSetDict):
        HW_set = list(self.HWSetCollection.find({"name": HWSetDict["name"]}, {"_id": 0}).limit(1))
        if len(HW_set) > 0:
            return HW_set[0]

    def add_capacity_HW(self, num, HWSetDict):
         self.HWSetCollection.update_one({"name": HWSetDict["name"]}, {"$inc": {"capacity": num, "available": num}})
         return True