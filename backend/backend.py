import json
import pandas as pd
import numpy as np

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from backend.llm_query import ai_query
from backend.backend3 import advanced_search

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

@app.route('/ai_query', methods=['POST'])
def make_ai_query():
    # Get the JSON data from the request
    data = request.get_json()

    # Check if 'input' key exists in the JSON data and retrieve its value
    if data and 'input' in data:
        input_text = data['input']
        
        # Pass the input text to the ai_query function
        output = ai_query(input_text)
        
        # Return the output as a JSON response
        return jsonify({"output": output})
    else:
        # Return an error message if the 'input' key is missing
        return jsonify({"error": "Missing 'input' in request data"}), 400

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

import json
from flask import Response

import json
from flask import Response
import pandas as pd
import numpy as np

@app.route('/advanced_search', methods=['GET'])
def perform_advanced_search():
    # Call advanced_search with the parameters from the request
    results = advanced_search(
        latitude=request.args.get('latitude', type=float),
        longitude=request.args.get('longitude', type=float),
        max_distance_km=request.args.get('distance', type=float),
        sector=request.args.get('sector'),
        subsector=request.args.get('subsector'),
        governorat=request.args.get('governorat'),
        district=request.args.get('district'),
        business_name=request.args.get('business_name'),
        has_vacancies=request.args.get('has_vacancies', type=lambda x: x.lower() == 'true'),
        allows_youth=request.args.get('allows_youth', type=lambda x: x.lower() == 'true'),
        expect_need=request.args.get('expect_need', type=lambda x: x.lower() == 'true')
    )

    # Replace NaN and infinite values in DataFrame or list with None
    if isinstance(results, pd.DataFrame):
        results = results.replace({np.nan: None, np.inf: None, -np.inf: None}).to_dict(orient='records')
    elif isinstance(results, list):
        results = [
            {k: (None if isinstance(v, float) and (np.isnan(v) or np.isinf(v)) else v)
             for k, v in item.items()}
            for item in results
        ]

    # Custom JSON serialization to handle any non-serializable data types
    def handle_non_serializable(obj):
        return str(obj)

    # Convert results to JSON with custom handling
    json_data = json.dumps(results, default=handle_non_serializable)

    # Return as a JSON response
    return Response(json_data, content_type='application/json')


if __name__ == '__main__':
    app.run(debug=True, port=5002)