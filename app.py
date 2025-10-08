from flask import Flask, jsonify, request
from flask_cors import CORS
from hastaliklar import hastaliklar
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app)

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")  # güvenlik için .env

@app.route("/diseases", methods=["GET"])
def get_diseases():
    return jsonify(hastaliklar)

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    question = data.get("question")
    disease_name = data.get("disease")

    if not question or not disease_name:
        return jsonify({"error": "Eksik parametre"}), 400

    client = OpenAI(api_key=OPENAI_API_KEY)

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{
            "role": "user",
            "content": (f"Doktorun sorduğu '{question}' sorusunu, "
                        f"bir {disease_name} hastası gibi cevapla, "
                        f"hastalık adını verme, 1-2 cümle ile cevapla.")
        }],
    )
    answer = response.to_dict()["choices"][0]["message"]["content"]
    return jsonify({"answer": answer})

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
