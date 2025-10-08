import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function PatientHistoryScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const [question, setQuestion] = useState("");
  const [answers, setAnswers] = useState([]); // birden fazla cevabı tutmak için
  const [loading, setLoading] = useState(false);
  const [questionCount, setQuestionCount] = useState(0); // soru hakkı takibi

  if (!cases || !cases[currentCaseIndex]) return <p>Vaka yükleniyor...</p>;
  const currentCase = cases[currentCaseIndex];

  const askQuestion = async () => {
    if (!question.trim()) return;
    if (questionCount >= 2) return; // 2 hakkı geçtiyse durdur

    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        question,
        diseaseIndex: currentCaseIndex,
      });

      const newAnswer = res?.data?.answer || "Cevap alınamadı.";
      setAnswers((prev) => [...prev, { question, answer: newAnswer }]);
      setQuestion(""); // input'u temizle
      setQuestionCount((prev) => prev + 1);
    } catch (err) {
      setAnswers((prev) => [
        ...prev,
        { question, answer: "Hata oluştu: " + (err.message || "Bilinmeyen hata") },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen">
      <h2>🧠 Hasta Hikayesi</h2>

      <div className="screen-content">
        <div style={{ flex: 1 }}>
          <p>{currentCase.hikaye}</p>
        </div>
      </div>

      <div className="input-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Sorunuzu yazın... (ör. Baş ağrısı ne kadar süredir?)"
          disabled={questionCount >= 2 || loading}
        />
        <button
          className="btn btn-primary"
          onClick={askQuestion}
          disabled={loading || questionCount >= 2}
        >
          {loading
            ? "Soruluyor..."
            : questionCount >= 2
            ? "Soru hakkın bitti"
            : "Sor"}
        </button>
      </div>

      {/* Tüm cevapları sıralı göster */}
      {answers.length > 0 && (
        <div className="screen-content" style={{ marginTop: 8 }}>
          {answers.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <strong>💬 Hasta Cevap {index + 1}:</strong>
              <div style={{ marginLeft: 10 }}>{item.answer}</div>
            </div>
          ))}
        </div>
      )}

      <div className="nav-buttons">
        <div />
        <div>
          <button
            className="btn btn-primary"
            onClick={nextStep}
            disabled={answers.length < 1} // en az 1 cevap alınmadan geçilmesin
          >
            Fizik Muayene →
          </button>
        </div>
      </div>
    </div>
  );
}
