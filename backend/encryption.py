import cryptography
import bcrypt
from cryptography.fernet import Fernet
class encrypt:
    def __init__(self):
        self.key = Fernet.generate_key()
        print(self.key)
        self.fernet = Fernet(self.key)
    def customEncrypt(self, inputText, N, D):
        inputText = inputText[::-1]
        # Checking the value for D
        strlen = len(inputText)
        if D < 0:
            phrase = ""
            for char in inputText:
                N = N%(127-34)
                x_ind = ord(char)-34
                if (x_ind-N) < 0:
                    character = chr(127+(x_ind-N))
                else:
                    character = chr(34+(x_ind-N))
                phrase += character
        elif D > 0:
            phrase = ""
            for char in inputText:
                character = chr(34+((ord(char)+N-34) % (127 - 34)))
                phrase += str(character)
        return phrase