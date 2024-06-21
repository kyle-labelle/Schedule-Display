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

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

if __name__ == '__main__':
    app.run(debug=True)
