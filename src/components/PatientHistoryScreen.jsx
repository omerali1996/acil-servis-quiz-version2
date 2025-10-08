import React, { useState, useEffect } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function PatientHistoryScreen() {
  const {
    cases,
    currentCaseIndex,
    nextStep,
    askedQuestions,
    setAskedQuestions,
    questionAttempts,
    setQuestionAttempts,
  } = useGame();

  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cases || !cases[currentCaseIndex]) return <p>Vaka yükleniyor...</p>;
  const currentCase = cases[currentCaseIndex];

  // İlk açılışta hakları ayarla
  useEffect(() => {
    if (!questionAttempts[currentCaseIndex]) {
      setQuestionAttempts((prev) => ({ ...prev, [currentCaseIndex]: 2 }));
    }
  }, [currentCaseIndex, setQuestionAttempts, questionAttempts]);

  const askQuestion = async () => {
    if (!question.trim()) return;

    const remaining = questionAttempts[currentCaseIndex] || 0;
    if (remaining <= 0) return; // hak yoksa dur

    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        question,
        diseaseIndex: currentCaseIndex,
      });
      const answerText = res?.data?.answer || "Cevap alınamadı.";

      // Soruyu ve cevabı kaydet
      setAskedQuestions((prev) => ({
        ...prev,
        [currentCaseIndex]: [
          ...(prev[currentCaseIndex] || []),
          { question, answer: answerText },
        ],
      }));

      // Hak azalt
      setQuestionAttempts((prev) => ({
        ...prev,
        [currentCaseIndex]: remaining - 1,
      }));
    } catch (err) {
      setAskedQuestions((prev) => ({
        ...prev,
        [currentCaseIndex]: [
          ...(prev[currentCaseIndex] || []),
          {
            question,
            answer: "Hata oluştu: " + (err.message || "Bilinmeyen hata"),
          },
        ],
      }));
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  const questionsForCurrentCase = askedQuestions[currentCaseIndex] || [];
  const remainingAttempts = questionAttempts[currentCaseIndex] || 0;

  return (
    <div className="screen">
      <h2>🧠 Hasta Hikayesi</h2>

      <div className="screen-content">
        <p>{currentCase.hikaye}</p>
      </div>

      <div className="input-row">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Sorunuzu yazın... (ör. Baş ağrısı ne kadar süredir?)"
          disabled={remainingAttempts <= 0 || loading}
        />
        <button
          className="btn btn-primary"
          onClick={askQuestion}
          disabled={loading || remainingAttempts <= 0}
        >
          {loading
            ? "Soruluyor..."
            : remainingAttempts <= 0
            ? "Soru hakkın bitti"
            : "Sor"}
        </button>
      </div>

      {/* Önceki soruları ve cevapları göster */}
      {questionsForCurrentCase.length > 0 && (
        <div className="screen-content" style={{ marginTop: 8 }}>
          {questionsForCurrentCase.map((item, index) => (
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
            disabled={questionsForCurrentCase.length < 1} // en az 1 soru sorulmadan geçilemez
          >
            Fizik Muayene →
          </button>
        </div>
      </div>
    </div>
  );
}
