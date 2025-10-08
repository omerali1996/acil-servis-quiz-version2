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
    <div>
      <h2>Hastalığı Tahmin Et</h2>
      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Tahmininizi yazın"
      />
      <button onClick={checkGuess}>Tahmin Et</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
}
