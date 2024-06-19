#To get the server to work this must be run independently of the ReactJS site.
#I have no idea how to get concurrently to work.

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

DATA_FILE = 'staff_members.json'

def load_staff_members():
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, 'r') as file:
            return json.load(file)
    return []

def save_staff_members(staff_members):
    with open(DATA_FILE, 'w') as file:
        json.dump(staff_members, file, indent=4)

staff_members = load_staff_members()

@app.route('/staff', methods=['GET'])
def get_staff():
    return jsonify(staff_members)

@app.route('/staff', methods=['POST'])
def add_staff():
    new_staff = request.json
    staff_members.append(new_staff)
    save_staff_members(staff_members)
    return jsonify(new_staff), 201

if __name__ == '__main__':
    app.run(debug=True)
