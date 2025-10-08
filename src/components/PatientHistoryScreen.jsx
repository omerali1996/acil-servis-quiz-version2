import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function PatientHistoryScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cases || !cases[currentCaseIndex]) return <p>Vaka yükleniyor...</p>;
  const currentCase = cases[currentCaseIndex];

  const askQuestion = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        question,
        diseaseIndex: currentCaseIndex
      });
      setAnswer(res?.data?.answer || "Cevap alınamadı.");
    } catch (err) {
      setAnswer("Hata oluştu: " + (err.message || "Bilinmeyen hata"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <h2>🧠 Hasta Hikayesi</h2>

      <div className="screen-content">
        <div style={{flex:1}}>
          <p>{currentCase.hikaye}</p>
        </div>
      </div>

      <div className="input-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Sorunuzu yazın... (ör. Baş ağrısı ne kadar süredir?)"
        />
        <button className="btn btn-primary" onClick={askQuestion} disabled={loading}>
          {loading ? "Soruluyor..." : "Sor"}
        </button>
      </div>

      {answer && (
        <div className="screen-content" style={{ marginTop: 8 }}>
          <strong>💬 Cevap:</strong>
          <div style={{ marginLeft: 10 }}>{answer}</div>
        </div>
      )}

      <div className="nav-buttons">
        <div />
        <div>
          <button className="btn btn-primary" onClick={nextStep} disabled={!answer}>
            Fizik Muayene →
          </button>
        </div>
      </div>
    </div>
  );
}
