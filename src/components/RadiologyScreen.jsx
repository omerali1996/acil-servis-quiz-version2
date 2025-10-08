import React from "react";
import { useGame } from "../context/GameContext";

export default function RadiologyScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div className="screen">
      <h2>🩻 Radyolojik Görüntüler</h2>

      <div className="screen-content">
        <p>{currentCase.klinik_bulgular.radyolojik_goruntuler}</p>
      </div>

      <div className="nav-buttons">
        <button className="btn btn-secondary" onClick={prevStep}>
          ← Geri
        </button>
        <button className="btn btn-primary" onClick={nextStep}>
          EKG →
        </button>
      </div>
    </div>
  );
}
