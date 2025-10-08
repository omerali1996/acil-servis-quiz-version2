import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import axios from "axios";

export default function PatientHistoryScreen() {
  const { nextStep } = useGame();
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [history] = useState(
    "45 yaşında erkek hasta, 2 saattir devam eden göğüs ağrısı ile başvurdu."
  );

  const askQuestion = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", { question });
      setResponse(res.data.answer);
    } catch {
      setResponse("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-blue-600">Hasta Öyküsü</h2>
      <p>{history}</p>

      <textarea
        className="w-full border rounded-md p-2"
        placeholder="Sorunuzu yazın..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <button
        onClick={askQuestion}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Soruyu Gönder
      </button>

      {response && (
        <div className="bg-gray-100 p-3 rounded-md">
          <strong>Hasta:</strong> {response}
        </div>
      )}

      <div className="text-right">
        <button
          onClick={nextStep}
          className="bg-green-500 text-white px-6 py-2 rounded mt-4"
        >
          Devam Et →
        </button>
      </div>
    </div>
  );
}
