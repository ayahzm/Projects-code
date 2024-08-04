from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pickle

app = Flask(__name__, static_folder='./build', static_url_path='')
CORS(app, resources={r"/diagnose": {"origins": "http://127.0.0.1:3000"}})

# Load the model
model = pickle.load(open('picklemodel.sav', 'rb'))

@app.route('/')
def home():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/diagnose', methods=['POST'])
def diagnose():
    data = request.json
    print("Received data:", data)
    
    if 'symptoms' not in data:
        error_message = 'Invalid input: symptoms not provided'
        print(error_message)
        return jsonify({'error': error_message}), 400

    symptoms = [data['symptoms']]
    print("Formatted symptoms:", symptoms)

    try:
        result = model.predict(symptoms)[0]
        print("Prediction:", result)
        return jsonify({'prediction': result})
    except Exception as e:
        error_message = str(e)
        print("Error during prediction:", error_message)
        return jsonify({'error': error_message}), 500

@app.route('/<path:path>')
def static_proxy(path):
    return send_from_directory(app.static_folder, path)

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(debug=True)