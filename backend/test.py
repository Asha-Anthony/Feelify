#import the required modules
from deepface import DeepFace


analysis = DeepFace.analyze(img_path = "D:/Github/Feelify/backend/latest.jpg", actions = ["emotion"])
  
# print result
print(analysis)