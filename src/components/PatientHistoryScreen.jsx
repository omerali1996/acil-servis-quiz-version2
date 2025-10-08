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
    <div className="screen">
      <h2>🧠 Hasta Hikayesi</h2>

      <div className="screen-content">
        <p>{currentCase.hikaye}</p>
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Sorunuzu yazın..."
        />
        <button className="btn btn-primary" onClick={askQuestion} disabled={loading}>
          {loading ? "Soruluyor..." : "Sor"}
        </button>
      </div>

      {answer && <p style={{ marginTop: "1rem" }}>💬 Hasta: {answer}</p>}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep} disabled>
          ← Geri
        </button>
        {answer && (
          <button className="btn btn-primary" onClick={nextStep}>
            Fizik Muayene →
          </button>
        )}
      </div>
    </div>
  );
}

