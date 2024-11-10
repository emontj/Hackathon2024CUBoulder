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
                  "Governorate": "Maan",
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

    message = completion.choices[0].message.content
    message.replace('```json', '')
    message.replace('```', '')
    return message

# Example usage
if __name__ == '__main__':
    client = OpenAI(api_key='') # NOTE: api key is a demo and won't always work
    user_query = "Show me small car repair businesses in Maan that are recruiting for seasonal employees."
    generated_json = generate_search_parameters(client, user_query)
    print(generated_json)
