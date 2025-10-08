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
      // küçük gecikme kullanıcı deneyimi için (setTimeout UI içinde, burada güvenli)
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

      <div className="screen-content">
        <div style={{flex:1}}>
          <p className="kv">Vaka özeti:</p>
          <p>{currentCase.hikaye}</p>
        </div>
      </div>

      <div className="input-row">
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
        <p className="feedback" style={{ color: feedback.startsWith("✅") ? "var(--success)" : "var(--danger)" }}>
          {feedback}
        </p>
      )}

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Geri
        </button>
        <div />
      </div>
    </div>
  );
}
