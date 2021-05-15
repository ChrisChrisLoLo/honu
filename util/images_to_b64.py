import base64
import os

"""
Script used to convert files into their base64 equivalent.
Used to get the base64 encoding of sprites.
Base64 is used as relative image imports are tricky in packages
"""

for filename in os.listdir(os.getcwd()):
    with open(os.path.join(os.getcwd(), filename), "rb") as image_file:
        print(filename+":")
        print(base64.b64encode(image_file.read()))
        print()