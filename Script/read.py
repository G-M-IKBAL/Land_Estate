import cv2
import math
import json
from pymongo import MongoClient
import pytesseract
# set the Tesseract executable path manually
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# connect to MongoDB
client = MongoClient('mongodb://localhost:27017')

# get the database and collection
db = client['landstate']
collection = db['maps']

plot_data = {}

img = cv2.imread('5-M1.jpg')
height, width = img.shape[:2]
# print("height",height)
# print("width",width)

plot_data['townid'] = '63bb5c18dcf175a91704f96e'
plot_data['length'] = height
plot_data['width'] = width
plot_data['houses'] = []
plot_data['hospital'] = []
plot_data['park'] = []
plot_data['mosque'] = []
plot_data['school'] = []

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
_, thresh = cv2.threshold(gray, 128, 5, cv2.THRESH_BINARY)
contours, hierarchy = cv2.findContours(
    thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
contour_areas = [cv2.contourArea(contour) for contour in contours]
min_area_threshold = 500
large_contours = [contours[i] for i in range(
    len(contours)) if contour_areas[i] > min_area_threshold]
new_origin = (0, 0)
counter = 0
large_contours.pop(0)
desire_text1 = 'Hospital'
desire_text2 = 'Park'
desire_text3 = 'School'
desire_text4 = 'Mosque'

for contour in large_contours:
    # Reading the Texts from Map and their coordinates
    x, y, w, h = cv2.boundingRect(contour)
    roi = img[y:y+h, x:x+w]
    gray_roi = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(gray_roi)
    cv2.circle(img, (x, y), radius=5, color=(0, 0, 255), thickness=10)
    if text.strip() == desire_text1:
        # pass
        plot_data['hospital'].append( {'x': int(x+(w/2)) - (width / 2), 'y': int(y+(h/2)) - (height / 2), 'width': w, 'height': h} )
        # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 10)
    elif text.strip() == desire_text2:
        plot_data['park'].append( {'x': int(x+(w/2)) - (width / 2), 'y': int(y+(h/2)) - (height / 2), 'width': w, 'height': h} )
        # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 10)
    elif text.strip() == desire_text3:
        plot_data['school'].append( {'x': int(x+(w/2)) - (width / 2), 'y': int(y+(h/2)) - (height / 2), 'width': w, 'height': h} )
        # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 10)
    elif text.strip() == desire_text4:
        plot_data['mosque'].append( {'x': int(x+(w/2)) - (width / 2), 'y': int(y+(h/2)) - (height / 2), 'width': w, 'height': h} )
        # cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 10)
    else:
        # cv2.circle(img, (int(x+(w/2)), int(y+(h/2))), radius=1, color=(255, 0, 0), thickness=10)
        plot_data['houses'].append( {'x': int(x+(w/2)) - (width / 2), 'y': int(y+(h/2)) - (height / 2), 'width': w, 'height': h, 'face': math.pi/2} )
        # M = cv2.moments(contour)
        # counter = counter+1
        # if M['m00'] != 0:
        #     cx = int(M['m10'] / M['m00'])
        #     cy = int(M['m01'] / M['m00'])
        #     nx = cx - (width / 2)
        #     ny = cy - (height / 2)
        #     cv2.circle(img, (cx, cy), radius=5,
        #                color=(0, 0, 255), thickness=10)
        #     # print("Centroid:", cx, cy)
        #     # print("Area", contour_areas[counter])
        #     # print("coord",nx,ny)
        #     # print("----------------------------")
        #     if counter > 2:
        #         plot_data['houses'].append(
        #             {'x': nx, 'y': ny, 'width': w, 'height': h, 'face': math.pi/2})
# print(plot_data)

# collection.insert_one(plot_data)
client.close()
cv2.drawContours(img, large_contours, -1, (0, 0, 255), 2)
cv2.imshow('Result', img)
cv2.waitKey(0)
cv2.destroyAllWindows()
