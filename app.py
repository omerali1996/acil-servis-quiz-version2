from flask import Flask, request, jsonify
from flask_cors import CORS
from openai import OpenAI
from hastaliklar import hastaliklar

app = Flask(__name__)
CORS(app)  # React frontend'den gelen istekleri kabul eder

client = OpenAI(api_key="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")  # kendi anahtarını buraya yaz

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
