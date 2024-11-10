from openai import OpenAI

def generate_search_parameters(client, user_query):
    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {"role": "system", "content": "You are an intelligent assistant that translates user queries into JSON search parameters for a backend system."},
            {
                "role": "user",
                "content": f"""
                Given the following user query, output a JSON object with appropriate search parameters.  Only include values that are relevant in the search query.

                JSON template:
                {{
                  "Business Phone Number": "776101410",
                  "Business name": "محل الضياء لقطع السيارات",
                  "Current//Areas of recruitment:/Customer Service Representatives": 0,
                  "Current//Areas of recruitment:/Sales": 0,
                  "Current//Please specify": "ميكانيكي سيارات /عامل غيار زيوت",
                  "Current//Priority areas of recruitment:/Others": 1,
                  "Current//Types of positions available:/Mid-senior level": 1,
                  "District": "Ash-Shobek",
                  "Economic sector": "Wholesale and Retail Trade",
                  "Enterprise size": "Micro",
                  "Governorat": "Maan",
                  "Is the company registered": "Yes",
                  "Phone Number": "0776101410",
                  "Sub-sector": "Retail trade (automotive)",
                  "What is the Type of registration?": "Sole proprietorship"
                }}

                User query: "{user_query}"
                
                JSON:
                """
            }
        ]
    )
    
    # Extract and return the generated JSON response

    message = str(completion.choices[0].message.content)
    message = message.replace('```json', '')
    message = message.replace('```', '')

    return message

def ai_query(user_query : str):
    with open('./backend/api_sk.txt', 'r') as file:
        secret_key = file.read() # just don't want my SK on git

    client = OpenAI(api_key=secret_key) # NOTE: api key is a demo and won't always work
    generated_json = generate_search_parameters(client, user_query)

    return generated_json # TODO: need to make into json object depending on backend?

# Example usage
if __name__ == '__main__':
    print(ai_query('Show me small car repair businesses in Maan that are recruiting for seasonal employees.'))
