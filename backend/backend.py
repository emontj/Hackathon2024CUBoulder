import json
import pandas as pd
import numpy as np

from flask import Flask, request, jsonify, Response
from flask_cors import CORS

from backend.llm_query import ai_query
from backend.backend3 import advanced_search

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True, methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"], allow_headers=["Content-Type"])
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

        # Call process_json with the generated filters
        with app.test_request_context('/query', json=output):
            response = process_json()

            return response  # Return the result from process_json directly

    else:
        # Return an error message if the 'input' key is missing
        return jsonify({"error": "Missing 'input' in request data"}), 400

@app.route('/new-record', methods=['POST'])
def new_record():
    # Get the JSON data from the request
    data = request.get_json()

    # Define the required columns for validation
    required_columns = [
        "Business Phone Number (If applicable)", "Business name:", "Current//Areas of recruitment:/Customer Service Representatives",
        "Current//Areas of recruitment:/Sales", "Current//Please specify", "Current//Priority areas of recruitment:/Administrative Staff",
        "Current//Priority areas of recruitment:/Finance", "Current//Priority areas of recruitment:/Information Technology (IT)",
        "Current//Priority areas of recruitment:/Marketing", "Current//Priority areas of recruitment:/Operational Staff (logistics and supply chain)",
        "Current//Priority areas of recruitment:/Others", "Current//Priority areas of recruitment:/Technical Staff",
        "Current//Types of positions available:/Entry level", "Current//Types of positions available:/Interns",
        "Current//Types of positions available:/Mid-senior level", "Current//Types of positions available:/Seasonal employees",
        "Current//Types of positions available:/Senior management level", "District", 
        "Do you consider youth (18-29 years) from the local community for employment?",
        "Do you expect the need for employees in the next year?", "Do you have any current available vacancies?",
        "Economic sector:", "Enterprise size (Micro, Small, Medium, Large)", "Enterprise size in terms of number of employees:",
        "Future//Areas of recruitment:/Customer Service Representatives", "Future//Areas of recruitment:/Sales", 
        "Future//Please specify", "Future//Priority areas of recruitment:/Administrative Staff", 
        "Future//Priority areas of recruitment:/Finance", "Future//Priority areas of recruitment:/Information Technology (IT)", 
        "Future//Priority areas of recruitment:/Marketing", "Future//Priority areas of recruitment:/Operational Staff (logistics and supply chain)",
        "Future//Priority areas of recruitment:/Others", "Future//Priority areas of recruitment:/Technical Staff", 
        "Future//TOTAL", "Future//Types of positions available:/Entry level", "Future//Types of positions available:/Interns",
        "Future//Types of positions available:/Mid-senior level", "Future//Types of positions available:/Seasonal employees",
        "Future//Types of positions available:/Senior management level", "Governorat", "Is the company registered", 
        "Number of expected job vacancies:", "Number of job vacancies:", "Phone Number", 
        "Please specify the business products and services", "Sub-sector:", "What is the Type of registration?",
        "end", "start", "today", "_Exact Location_latitude", "_Exact Location_longitude", "_id"
    ]

    # Check for missing fields in the incoming data
    missing_fields = [field for field in required_columns if field not in data]
    if missing_fields:
        return jsonify({"error": f"Missing fields: {', '.join(missing_fields)}"}), 400

    # Append the new record to the DataFrame
    global df
    new_row = pd.DataFrame([data], columns=required_columns)
    df = pd.concat([df, new_row], ignore_index=True)

# Route that receives a JSON object and dynamically filters the DataFrame
@app.route('/query', methods=['POST'])
def process_json():
    # Get the JSON data from the request
    try:
        data = request.get_json(force=True)

        if isinstance(data, str):
            data = json.loads(data)
        print("Received JSON data:", data)  # Debugging line to print received JSON data
    except Exception as e:
        return jsonify({"message": "Invalid JSON format.", "status": "error"}), 400

    # Start with the full DataFrame and apply filters dynamically based on JSON keys
    filtered_df = df.copy()

    # Apply filters for each key-value pair in the JSON data
    for key, value in data.items():
        if value is not None:
            # Check if the column exists in the DataFrame
            if key in df.columns:
                # Handle case where the filter value is a list
                if isinstance(value, list):
                    filtered_df = filtered_df[filtered_df[key].isin(value)]
                elif pd.api.types.is_string_dtype(df[key]):
                    filtered_df = filtered_df[filtered_df[key].str.contains(str(value), case=False, na=False)]
                else:
                    filtered_df = filtered_df[filtered_df[key] == value]
            else:
                print(f"Warning: Column '{key}' not found in DataFrame")

    # Convert NaNs to None and return JSON response
    results = filtered_df.replace({np.nan: None}).to_dict(orient='records')
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

    # Column name mapping from current DataFrame columns to desired JSON schema
    column_mapping = {
        'phone_number': 'Phone Number',
        'business_name:': 'Business name:',
        'district': 'District',
        'do_you_consider_youth_18-29_years_from_the_local_community_for_employment': 'Do you consider youth (18-29 years) from the local community for employment?',
        'do_you_expect_the_need_for_employees_in_the_next_year': 'Do you expect the need for employees in the next year?',
        'do_you_have_any_current_available_vacancies': 'Do you have any current available vacancies?',
        'sector': 'Economic sector:',
        'subsector': 'Sub-sector:',
        '_exact_location_latitude': '_Exact Location_latitude',
        '_exact_location_longitude': '_Exact Location_longitude',
        'number_of_job_vacancies': 'Number of job vacancies:',
        'enterprise_size': 'Enterprise size (Micro, Small, Medium, Large)',
        'please_specify_the_business_products_and_services': 'Please specify the business products and services',
        'governorat' : 'Governorat'
    }

    # Replace NaN and infinite values in DataFrame with None, if results are a DataFrame
    if isinstance(results, pd.DataFrame):
        results = results.replace({np.nan: None, np.inf: None, -np.inf: None}).rename(columns=column_mapping).to_dict(orient='records')
    elif isinstance(results, list):
        # If already a list, iterate and apply mapping manually
        results = [
            {column_mapping.get(k, k): (None if isinstance(v, float) and (np.isnan(v) or np.isinf(v)) else v)
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