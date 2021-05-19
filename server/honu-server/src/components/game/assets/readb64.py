import base64
import os

"""
script used to convert files into their base64 equivalent
"""

for filename in os.listdir(os.getcwd()):
    with open(os.path.join(os.getcwd(), filename), "rb") as image_file:
        print(filename+":")
        print(base64.b64encode(image_file.read()))
        print()
