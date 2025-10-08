import React from "react";
import { useGame } from "../context/GameContext";

export default function RadiologyScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div>
      <h2>Radyolojik Görüntüler</h2>
      <p>{currentCase.klinik_bulgular.radyolojik_goruntuler}</p>
      <button onClick={nextStep}>EKG</button>
    </div>
  );
}
