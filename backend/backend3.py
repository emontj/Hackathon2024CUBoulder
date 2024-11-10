import pandas as pd
from geopy.distance import geodesic

# Load and preprocess the DataFrame
df = pd.read_excel('./backend/dassadata.xlsx')

# Verify and standardize column names
df.columns = [col.strip().lower().replace(" ", "_").replace("(", "").replace(")", "") for col in df.columns]
print("Columns in the dataset:", df.columns)  # Print to verify column names

# Check for expected latitude and longitude columns and rename if they exist
if '_exact_location_latitude' in df.columns and '_exact_location_longitude' in df.columns:
    df['latitude'] = df['_exact_location_latitude']
    df['longitude'] = df['_exact_location_longitude']
else:
    raise KeyError("Latitude and longitude columns not found in dataset.")

# Preprocess boolean columns if they exist
if 'do_you_consider_youth_18-29_years_from_the_local_community_for_employment' in df.columns:
    df['do_you_consider_youth_18-29_years_from_the_local_community_for_employment'] = \
        df['do_you_consider_youth_18-29_years_from_the_local_community_for_employment'].replace({'Yes': True, 'No': False}).fillna(False)

if 'do_you_expect_the_need_for_employees_in_the_next_year' in df.columns:
    df['do_you_expect_the_need_for_employees_in_the_next_year'] = \
        df['do_you_expect_the_need_for_employees_in_the_next_year'].replace({'Yes': True, 'No': False}).fillna(False)

if 'do_you_have_any_current_available_vacancies' in df.columns:
    df['do_you_have_any_current_available_vacancies'] = \
        df['do_you_have_any_current_available_vacancies'].replace({'Yes': True, 'No': False}).fillna(False)

def advanced_search(
    latitude=None,
    longitude=None,
    max_distance_km=None,
    sector=None,
    subsector=None,
    governorat=None,
    district=None,
    business_name=None,
    has_vacancies=None,
    allows_youth=None,
    expect_need=None
):
    filtered_df = df.copy()

    # Filter by proximity if coordinates are provided
    if latitude is not None and longitude is not None and max_distance_km is not None:
        def within_distance(row):
            return geodesic((row['latitude'], row['longitude']), (latitude, longitude)).km <= max_distance_km
        filtered_df = filtered_df[filtered_df.apply(within_distance, axis=1)]

    # Apply additional filters if specified, checking column existence
    if sector and 'sector' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['sector'] == sector]
    if subsector and 'subsector' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['subsector'] == subsector]
    if governorat and 'governorat' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['governorat'] == governorat]
    if district and 'district' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['district'] == district]
    if business_name and 'business_name' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['business_name'].str.contains(business_name, case=False, na=False)]
    if has_vacancies is not None and 'do_you_have_any_current_available_vacancies' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['do_you_have_any_current_available_vacancies'] == has_vacancies]
    if allows_youth is not None and 'do_you_consider_youth_18-29_years_from_the_local_community_for_employment' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['do_you_consider_youth_18-29_years_from_the_local_community_for_employment'] == allows_youth]
    if expect_need is not None and 'do_you_expect_the_need_for_employees_in_the_next_year' in filtered_df.columns:
        filtered_df = filtered_df[filtered_df['do_you_expect_the_need_for_employees_in_the_next_year'] == expect_need]

    # Convert result to a list of dictionaries
    return filtered_df.to_dict(orient='records')
