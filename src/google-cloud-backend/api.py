import flask
from flask import jsonify
from flask_cors import CORS, cross_origin


app = flask.Flask(__name__)
app.config["DEBUG"] = True
print("Test")
testConstant = "1"
events = [
    {
      "eventName": "Aggie Cru Pizza Social",
      "user": "aggiecru@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-08T17:00:00+00:00",
      "endTime":"2019-09-08T18:00:00+00:00",
      "description": "Come meet other Aggies and enjoy free food! We will be providing free pizza and drinks along with games to play afterward.",
      "location": "Academic Plaza",
      "organization": "Cru",
      "meetsCriteria" : True
    },
    {
      "eventName": "ICPC Programming Contest",
      "user": "tannerhoke@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-08T18:00:00+00:00",
      "endTime": "2019-09-08T22:00:00+00:00",
      "description": "Try your hand at coding and come to the ICPC Programming contest! Food and drinks will be provided to all contestants. Sign up for the competition at icpc.com/register.",
      "location": "MSC 1400",
      "organization": "ICPC",
      "meetsCriteria":True
    },
    {
      "eventName": "TANSA Informational",
      "user": "TANSAAggies@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-08T17:30:00+00:00",
      "endTime": "2019-09-08T18:30:00+00:00",
      "description": "Learn more about what TANSA does and how you can help! Canes will be served.",
      "location": "MSC 1423",
      "organization": "TANSA",
      "meetsCriteria":True
    },
    {
      "eventName": "Course Scheduling Social",
      "user": "dannyboy@gmail.com",
      "sanctioned": False,
      "startTime": "2019-09-08T23:00:00+00:00",
      "endTime": "2019-09-09T00:30:00+00:00",
      "description": "There's free ice cream if you come to the course scheduling social. You must be a member of EH to attend.",
      "location": "ZACH 201",
      "organization": "Engineering Honors",
      "meetsCriteria":True
    },
    {
      "eventName": "Bro Brunch",
      "user": "aggiemensclub@gmail.com",
      "sanctioned": False,
      "startTime": "2019-09-12T15:30:00+00:00",
      "endTime": "2019-09-12T16:30:00+00:00",
      "description": "Get to meet some great bros and dine fine with free pancakes and eggs",
      "location": "MSC 104",
      "organization": "Aggie Men's Club",
      "meetsCriteria":True
    },
    {
      "eventName": "BSM Free Lunch",
      "user": "imatson9119@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-11T17:30:00+00:00",
      "endTime": "2019-09-11T19:00:00+00:00",
      "description": "Come enjoy free lunch at the Baptist Student Ministry- meet some new friends and enjoy a free meal!",
      "location": "Northgate",
      "organization": "Baptist Student Ministry",
      "meetsCriteria":True
    },
    {
      "eventName": "MSC Fish Informational",
      "user": "mscfish@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-14T22:00:00+00:00",
      "endTime": "2019-09-14T24:00:00+00:00",
      "description": "An informational for MSC Fish, a Freshman Leadership organization (FLO). Dinner will be provided.",
      "location": "Rudder Auditorium",
      "organization": "MSC Fish",
      "meetsCriteria":False
    },
    {
      "eventName": "Fish Aides Informational",
      "user": "travis.cantwell@tamu.edu",
      "sanctioned": False,
      "startTime": "2019-09-17T17:00:00+00:00",
      "endTime": "2019-09-17T19:00:00+00:00",
      "description": "An informational for Fish Aides, a Freshman Leadership organization (FLO). Lunch will be provided.",
      "location": "ZACH 410",
      "organization": "Fish Aides",
      "meetsCriteria":False
    },
    {
      "eventName": "Intramural Sports Social",
      "user": "intramuralsportsoffice@tamu.edu",
      "sanctioned": True,
      "startTime": "2019-09-19T19:00:00+00:00",
      "endTime": "2019-09-19T21:30:00+00:00",
      "description": "Come learn about intramural sports and enjoy free lunch!",
      "location": "Student Rec Center 102",
      "organization": "Intramural Sports Office",
      "meetsCriteria":False
    },
    {
      "eventName": "EFall Programming Competition",
      "user": "hoke_t@icloud.com",
      "sanctioned": False,
      "startTime": "2019-09-15T12:30:00+00:00",
      "endTime": "2019-09-15T21:45:00+00:00",
      "description": "CSCE Fall Programming Competition. Snacks will be provided!",
      "location": "ZACH Chevron Room",
      "organization": "CSCE Department",
      "meetsCriteria":False
    }
  ]


cors = CORS(app, resources={r"/api/getevents": {"origins": "*"}})

app.config['CORS_HEADERS'] = 'Content-Type'

'''@app.route('/api/getevents', methods=['GET'])
def home():
    global testConstant
    testConstant += "1"
    return jsonify(testConstant)'''

@app.route('/', methods=['GET'])
def getEvents():
    return jsonify(events)


app.run()