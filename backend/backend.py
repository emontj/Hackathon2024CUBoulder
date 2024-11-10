from flask import Flask, request, jsonify

app = Flask(__name__)

# Route for a simple "Hello, World!" response
@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello, World!"

# Route that receives a JSON object and responds with another JSON object
@app.route('/query', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    data = request.get_json()

    # Example response JSON object
    response = {
        "message": "Received your data!",
        "received_data": data,
        "status": "success"
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
