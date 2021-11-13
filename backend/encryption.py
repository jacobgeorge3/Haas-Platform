class encrypt:
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