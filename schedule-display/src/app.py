from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from werkzeug.utils import secure_filename
import json
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

UPLOAD_FOLDER = os.path.join(app.root_path, 'src/data/uploads')
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

DATA_FILE = os.path.join(app.root_path, 'src/data/staff_members.json')
EVENT_DATA_FILE = os.path.join(app.root_path, 'src/data/events.json')
SHIFT_DATA_FILE = os.path.join(app.root_path, 'src/data/shifts.json')

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def load_staff_members():
    if os.path.exists(DATA_FILE):
        try:
            with open(DATA_FILE, 'r') as file:
                return json.load(file)
        except json.JSONDecodeError:
            return []
    return []

def save_staff_members(staff_members):
    print(f"Saving {len(staff_members)} staff members to {DATA_FILE}")
    with open(DATA_FILE, 'w') as file:
        json.dump(staff_members, file, indent=4)
    print("Save successful")

staff_members = load_staff_members()
print(f"Loaded {len(staff_members)} staff members from {DATA_FILE}")

@app.route('/staff', methods=['GET'])
def get_staff():
    return jsonify(staff_members)

@app.route('/staff', methods=['POST'])
def add_staff():
    name = request.form['name']
    position = request.form['position']
    if 'photo' not in request.files:
        return jsonify({'error': 'No photo part in the request'}), 400
    photo = request.files['photo']
    if photo.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    if photo and allowed_file(photo.filename):
        filename = secure_filename(photo.filename)
        photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        new_staff = {'name': name, 'position': position, 'photo': filename}
        staff_members.append(new_staff)
        print(f"Adding new staff member: {new_staff}")
        save_staff_members(staff_members)
        return jsonify(new_staff), 201
    else:
        return jsonify({'error': 'File type not allowed'}), 400

# EVENTS
def load_events():
    if os.path.exists(EVENT_DATA_FILE):
        try:
            with open(EVENT_DATA_FILE, 'r') as file:
                return json.load(file)
        except json.JSONDecodeError:
            return []
    return []

def save_events(events):
    print(f"Saving {len(events)} events to {EVENT_DATA_FILE}")
    with open(EVENT_DATA_FILE, 'w') as file:
        json.dump(events, file, indent=4)
    print("Save successful")

events = load_events()
print(f"Loaded {len(events)} events from {EVENT_DATA_FILE}")

@app.route('/event', methods=['POST'])
def add_event():
    name = request.form['name']
    description = request.form['description']
    datetime = request.form['datetime']

    new_event = {'name': name, 'description': description, 'datetime': datetime}
    events.append(new_event)
    print(f"Adding new event: {new_event}")
    save_events(events)
    return jsonify(new_event), 201

@app.route('/event', methods=['GET'])
def get_events():
    return jsonify(events)

# SHIFTS
def load_shifts():
    if os.path.exists(SHIFT_DATA_FILE):
        try:
            with open(SHIFT_DATA_FILE, 'r') as file:
                return json.load(file)
        except json.JSONDecodeError:
            return []
    return []

def save_shifts(shifts):
    print(f"Saving {len(shifts)} shifts to {SHIFT_DATA_FILE}")
    with open(SHIFT_DATA_FILE, 'w') as file:
        json.dump(shifts, file, indent=4)
    print("Save successful")

shifts = load_shifts()
print(f"Loaded {len(shifts)} shifts from {SHIFT_DATA_FILE}")

@app.route('/shift', methods=['POST'])
def add_shift():
    name = request.form['name']
    start_datetime = request.form['startDatetime']
    end_datetime = request.form['endDatetime']

    new_shift = {'name': name, 'startDatetime': start_datetime, 'endDatetime': end_datetime}
    shifts.append(new_shift)
    print(f"Adding new shift: {new_shift}")
    save_shifts(shifts)
    return jsonify(new_shift), 201

@app.route('/shift', methods=['GET'])
def get_shifts():
    return jsonify(shifts)

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
