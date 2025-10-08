import React, { useState } from "react";
import { useGame } from "../context/GameContext";
import api from "../api";

export default function PatientHistoryScreen() {
  const { cases, currentCaseIndex, nextStep, questionsData, updateCaseQuestions } = useGame();
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  if (!cases || !cases[currentCaseIndex]) return <p>Vaka yükleniyor...</p>;
  const currentCase = cases[currentCaseIndex];

  // Context'ten alıyoruz, yoksa default
  const caseQuestions = questionsData[currentCaseIndex] || { answers: [], questionCount: 0 };
  const { answers, questionCount } = caseQuestions;

  const askQuestion = async () => {
    if (!question.trim()) return;
    if (questionCount >= 2) return;

    setLoading(true);
    try {
      const res = await api.post("/api/ask", {
        question,
        diseaseIndex: currentCaseIndex,
      });

      const newAnswer = res?.data?.answer || "Cevap alınamadı.";
      const newAnswers = [...answers, { question, answer: newAnswer }];
      updateCaseQuestions(currentCaseIndex, {
        answers: newAnswers,
        questionCount: questionCount + 1,
      });

      setQuestion("");
    } catch (err) {
      const newAnswers = [...answers, { question, answer: "Hata oluştu: " + (err.message || "Bilinmeyen hata") }];
      updateCaseQuestions(currentCaseIndex, {
        answers: newAnswers,
        questionCount: questionCount + 1,
      });
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
            disabled={answers.length < 1}
          >
            Fizik Muayene →
          </but
