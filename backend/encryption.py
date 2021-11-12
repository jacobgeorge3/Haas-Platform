import cryptography
import bcrypt
from cryptography.fernet import Fernet
class encrypt():
    def __init__(self):
        self.key = Fernet.generate_key()
        self.fernet = Fernet(self.key)
    def encrypt_userInfo(self, userDict):
        userDict["username"] = self.fernet.encrypt(userDict["username"])
        userDict["password"] = self.fernet.encrypt(userDict["password"])
        return userDict
    def decrypt_userInfo(self, userDict):
        userDict["username"] = self.fernet.decrypt(userDict["username"])
        userDict["password"] = self.fernet.decrypt(userDict["password"])
        return userDict