import pandas as pd
from whoosh.fields import Schema, TEXT, NUMERIC
from whoosh.index import create_in, open_dir
from whoosh.qparser import QueryParser
from whoosh.writing import AsyncWriter
import os
from geopy.distance import geodesic

# Load the dataset from Excel
file_path = 'backend/dassadata.xlsx'  # replace with your actual path
df = pd.read_excel(file_path)

# Rename latitude and longitude columns to simpler names for ease of access
df['latitude'] = df['_Exact Location_latitude']
df['longitude'] = df['_Exact Location_longitude']

# Fill NaN values for relevant columns
df['Sub-sector:'] = df['Sub-sector:'].fillna("")
df['Please specify the business products and services'] = df['Please specify the business products and services'].fillna("")
df['Phone Number'] = df['Phone Number'].fillna("")
df['Number of job vacancies:'] = df['Number of job vacancies:'].fillna(0)
df['latitude'] = df['latitude'].fillna(0)  # Assign 0 or some default value if missing
df['longitude'] = df['longitude'].fillna(0)

# Map employee size descriptions to approximate numeric values
employee_size_map = {
    'Less than 10 employees': 5,
    '10-50 employees': 30,
    '50-250 employees': 150,
    'More than 250 employees': 300
}
df['Enterprise size in terms of number of employees:'] = df['Enterprise size in terms of number of employees:'] \
    .map(employee_size_map).fillna(0)

# Define schema for Whoosh index, using the appropriate columns
schema = Schema(
    sub_sector=TEXT(stored=True),
    business_services=TEXT(stored=True),
    phone_number=TEXT(stored=True),
    employees=NUMERIC(stored=True),  # Now numeric after mapping
    vacancies=NUMERIC(stored=True),
    latitude=NUMERIC(stored=True, numtype=float),
    longitude=NUMERIC(stored=True, numtype=float),
)

# Create index directory for Whoosh
index_dir = "indexdir"
if not os.path.exists(index_dir):
    os.mkdir(index_dir)
index = create_in(index_dir, schema)

# Index data with Whoosh, handling rows with missing data
writer = AsyncWriter(index)
for _, row in df.iterrows():
    # Only add to index if both latitude and longitude are valid (not zero or default placeholder)
    if row['latitude'] != 0 and row['longitude'] != 0:
        writer.add_document(
            sub_sector=row['Sub-sector:'],
            business_services=row['Please specify the business products and services'],
            phone_number=str(row['Phone Number']),
            employees=row['Enterprise size in terms of number of employees:'],
            vacancies=row['Number of job vacancies:'],
            latitude=row['latitude'],
            longitude=row['longitude']
        )
writer.commit()

# Function to filter results by geographic proximity
def filter_by_proximity(df, latitude, longitude, max_distance_km=5):
    def within_distance(row):
        business_location = (row['latitude'], row['longitude'])
        user_location = (latitude, longitude)
        distance = geodesic(business_location, user_location).km
        return distance <= max_distance_km

    # Filter DataFrame rows by distance
    nearby_df = df[df.apply(within_distance, axis=1)]
    return nearby_df

# Function to perform flexible search queries
def query_dataset(
    text_query=None,
    latitude=None,
    longitude=None,
    max_distance_km=None,
    min_employees=None,
    max_employees=None
):
    # Perform text search if a text query is provided
    if text_query:
        index = open_dir(index_dir)
        with index.searcher() as searcher:
            query = QueryParser("business_services", index.schema).parse(text_query)
            text_results = searcher.search(query, limit=10)
            result_df = pd.DataFrame([dict(result) for result in text_results])
    else:
        # If no text query, start with the entire DataFrame
        result_df = df.copy()
    
    # Filter by geographic proximity if latitude, longitude, and max_distance_km are provided
    if latitude is not None and longitude is not None and max_distance_km is not None:
        result_df = filter_by_proximity(result_df, latitude, longitude, max_distance_km)

    # Filter by employee range if min_employees or max_employees are specified
    # NOTE: not working
    # if min_employees is not None:
    #     result_df = result_df[result_df['Enterprise size in terms of number of employees:'] >= min_employees]
    # if max_employees is not None:
    #     result_df = result_df[result_df['Enterprise size in terms of number of employees:'] <= max_employees]

    return result_df

if __name__ == '__main__':
    # 1. Query by proximity only (within 10 km radius)
    proximity_results = query_dataset(latitude=31.95, longitude=35.91, max_distance_km=10)
    print("Proximity-Only Results:")
    print(proximity_results)

    # 2. Query by proximity and employee size range
    filtered_results = query_dataset(latitude=31.95, longitude=35.91, max_distance_km=10, min_employees=5, max_employees=50)
    print("\nProximity and Employee Range Results:")
    print(filtered_results)

    # 3. Query by text, proximity, and employee size range
    full_query_results = query_dataset(
        text_query="بيع قطع سيارات جديدة و مستخدمة",
        latitude=31.95,
        longitude=35.91,
        max_distance_km=10,
        min_employees=5,
        max_employees=50
    )
    print("\nFull Query Results (Text, Proximity, Employee Range):")
    print(full_query_results)
