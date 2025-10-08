import React from "react";
import { useGame } from "../context/GameContext";

export default function TestsScreen() {
  const { cases, currentCaseIndex, nextStep, prevStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div className="screen">
      <h2>🧫 Tetkikler</h2>

      <div className="screen-content">
        <p>{currentCase.klinik_bulgular?.tetkikler ?? "Tetkik bilgisi yok."}</p>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Geri
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Radyoloji →
        </button>
      </div>
    </div>
  );
}
