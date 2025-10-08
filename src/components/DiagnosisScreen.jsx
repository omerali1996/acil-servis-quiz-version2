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
    <div className="diagnosis-screen">
      <h2 className="title">🩺 Hastalığı Tahmin Et</h2>

      <div className="input-group">
        <input
          className="guess-input"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Tahmininizi yazın..."
        />
        <button className="btn-primary" onClick={checkGuess}>
          Tahmin Et
        </button>
      </div>

      {feedback && (
        <p
          className={`feedback ${
            feedback.startsWith("✅") ? "success" : "error"
          }`}
        >
          {feedback}
        </p>
      )}
    </div>
  );
}
