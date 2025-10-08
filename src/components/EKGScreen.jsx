import React from "react";
import { useGame } from "../context/GameContext";

export default function EKGScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div className="screen">
      <h2>📈 EKG Bulguları</h2>

      <div className="screen-content">
        <p>{currentCase.klinik_bulgular.ekg}</p>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Geri
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          Tetkikler →
        </button>
      </div>
    </div>
  );
}

