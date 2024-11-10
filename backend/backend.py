from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)
df = pd.read_excel('./backend/dassadata.xlsx')

# Route for a simple "Hello, World!" response
@app.route('/hello', methods=['GET'])
def hello_world():
    return "Hello, World! Test!"

@app.route('/test', methods=['GET'])
def test_dataframe():
    # Get the first row of the DataFrame and convert to a dictionary with native Python types
    first_row = df
    print("First Row:", first_row)  # Print the first row in the console for debugging
    return jsonify(first_row)

# Route that receives a JSON object and dynamically filters the DataFrame
@app.route('/query', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    data = request.get_json()
    print("Received JSON data:", data)  # Debugging line to print received JSON data

    # Start with the full DataFrame and apply filters dynamically based on JSON keys
    filtered_df = df

# Apply filters for each key-value pair in the JSON data
    for key, value in data.items():
        if value:
            # Check if the column exists in the DataFrame
            if key in df.columns:
                # Handle case where the filter value is a list (e.g., ["Ash-Shobek", "Koorah"])
                if isinstance(value, list):
                    filtered_df = filtered_df[filtered_df[key].isin(value)]
                elif pd.api.types.is_string_dtype(df[key]):
                    filtered_df = filtered_df[filtered_df[key].str.contains(str(value), case=False, na=False)]
                else:
                    filtered_df = filtered_df[filtered_df[key] == value]
            else:
                print(f"Warning: Column '{key}' not found in DataFrame")

    results = filtered_df.to_dict(orient='records')
    return jsonify({
        "message": "Filtered data returned.",
        "status": "success",
        "filtered_data": results
    })

# New route to return the entire DataFrame as JSON
@app.route('/all', methods=['GET'])
def get_all_data():
    # Convert DataFrame to list of dictionaries, replacing NaN with None
    all_data = df.where(pd.notnull(df), None).to_dict(orient='records')
    print("Returning entire DataFrame")  # Debugging line to print to console
    return jsonify(all_data)

if __name__ == '__main__':
    app.run(debug=True, port=5002)