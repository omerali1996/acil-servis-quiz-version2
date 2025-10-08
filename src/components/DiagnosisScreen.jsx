import React, { useState } from "react";
import { useGame } from "../context/GameContext";

export default function DiagnosisScreen() {
  const { cases, currentCaseIndex, nextCase } = useGame();
  const currentCase = cases[currentCaseIndex];
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  const checkGuess = () => {
    if (guess.trim().toLowerCase() === currentCase.ad.toLowerCase()) {
      setFeedback("✅ Doğru tahmin! Sonraki vakaya geçiliyor...");
      setTimeout(() => {
        setFeedback("");
        setGuess("");
        nextCase();
      }, 2000);
    } else {
      setFeedback(`❌ Yanlış! Doğru cevap: ${currentCase.ad}`);
    }
  };

  return (
    <div className="screen">
      <h2>🔍 Hastalığı Tahmin Et</h2>

      <div className="screen-content">
        <input
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Tahmininizi yazın..."
        />
        <button className="btn btn-primary" onClick={checkGuess}>
          Tahmin Et
        </button>
      </div>

      {feedback && (
        <p
          style={{
            marginTop: "1rem",
            color: feedback.startsWith("✅") ? "green" : "red",
            fontWeight: 500
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
