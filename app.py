import os
from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS
from hastaliklar import hastaliklar

app = Flask(__name__)
CORS(app)

# Environment variable'dan API key al
API_KEY = os.environ.get("OPENAI_API_KEY")
if not API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set!")
client = OpenAI(api_key=API_KEY)  # kendi anahtarını buraya yaz






@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    question = data.get("question", "")

    # Basit context: Hasta gibi cevap ver
    messages = [
        {"role": "system", "content": "Sen bir hasta gibi davran, sorulara kendi durumuna göre yanıt ver."},
        {"role": "user", "content": question}
    ]

    try:
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=messages
        )
        answer = response.choices[0].message.content
        return jsonify({"answer": answer})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/diseases', methods=['GET'])
def get_diseases():
    return jsonify(hastaliklar)


if __name__ == "__main__":
    app.run(debug=True)

