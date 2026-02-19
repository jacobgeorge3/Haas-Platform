import bcrypt

class encrypt:
    def customEncrypt(self, inputText, N, D):
        # N and D are legacy arguments from the old caesar cipher.
        # We ignore them but keep the signature to avoid breaking callers immediately
        # (though callers should be updated to not pass them eventually).
        # However, looking at usage in database.py, it expects to get a string back 
        # that it can compare.
        # Bcrypt is a one-way hash. We cannot "decrypt" it or just "encrypt" it 
        # and expect it to match a stored plain text if we were doing reversible encryption.
        # But wait, the original code verifies password by:
        # usr["password"] == userDict["password"] (after encrypting userDict["password"])
        # So as long as this function returns the HASH of the input text, 
        # and we use it for both setting and checking, it *might* work for new users.
        # BUT bcrypt generates a different salt every time!
        # So `bcrypt.hashpw(password, s1) != bcrypt.hashpw(password, s2)`
        # The `verify_user` logic in database.py does:
        # userDict["password"] = self.crypt.customEncrypt(userDict["password"], 3, 1)
        # if usr["password"] == userDict["password"]: return True
        #
        # This Logic is FLAWED for bcrypt. 
        # We need to change the usages in database.py too.
        #
        # For this file, let's provide helper methods `hash_password` and `check_password`.
        # And we can leave `customEncrypt` as a wrapper that maybe just fails or purely hashes 
        # (but hashing without salt storage is bad/impossible with bcrypt's dynamic salt).
        # 
        # Actually, let's just replace the class with a proper one and update callers.
        pass

    def hash_password(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def check_password(self, password, hashed):
        return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))