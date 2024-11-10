import pandas as pd

# Load the Excel file into a DataFrame
df = pd.read_excel('backend/dassadata.xlsx')

# Loop through each column and print distinct values if there are fewer than 20
for col in df.columns:
    unique_values = df[col].unique()
    if len(unique_values) < 100:
        print(f"Column: {col}")
        print("Distinct values:", unique_values)
        print("-" * 40)
