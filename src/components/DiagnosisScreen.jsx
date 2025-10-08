import React, { useState } from "react";
import { useGame } from "../context/GameContext";

export default function DiagnosisScreen() {
  const { cases, currentCaseIndex, nextCase, prevStep } = useGame();
  const currentCase = cases[currentCaseIndex];
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  const checkGuess = () => {
    if (!guess.trim()) {
      setFeedback("Lütfen bir tahmin girin.");
      return;
    }

    const normalizedGuess = guess.trim().toLowerCase();
    const normalizedAnswer = (currentCase.ad || "").toLowerCase();

    if (normalizedGuess === normalizedAnswer) {
      setFeedback("✅ Doğru tahmin! Sonraki vakaya geçiliyor...");
      setTimeout(() => {
        setFeedback("");
        setGuess("");
        nextCase();
      }, 900);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${currentCase.ad}`);
    }
  };

  return (
    <div className="screen">
      <h2>🔍 Hastalığı Tahmin Et</h2>

      <div className="input-row" style={{ marginTop: "2rem" }}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Tahmininizi yazın..."
          aria-label="Tahmininiz"
        />
        <button className="btn btn-primary" onClick={checkGuess}>
          Tahmin Et
        </button>
      </div>

      {feedback && (
        <p
          className="feedback"
          style={{
            color: feedback.startsWith("✅") ? "green" : "red",
            fontWeight: 500,
            marginTop: "1rem",
          }}
        >
          {feedback}
        </p>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Geri
        </button>
      </div>
    </div>
  );
}
