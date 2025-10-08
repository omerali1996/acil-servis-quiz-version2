import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function PatientHistoryScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");

  if (!cases || !cases[currentCaseIndex]) return <p>Vaka yükleniyor...</p>;
  const currentCase = cases[currentCaseIndex];

  const askQuestion = async () => {
    if (!question) return;
    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        question,
        diseaseIndex: currentCaseIndex
      });
      setAnswer(res.data.answer);
    } catch (err) {
      setAnswer("Hata oluştu: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Vaka: {currentCase.hikaye}</h2>
      <input
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Sorunuzu yazın"
      />
      <button onClick={askQuestion} disabled={loading}>Sor</button>
      {answer && <p>💬 Hasta: {answer}</p>}
      {answer && <button onClick={nextStep}>Fizik Muayene</button>}
    </div>
  );
}
