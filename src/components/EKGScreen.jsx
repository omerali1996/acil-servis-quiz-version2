import React from "react";
import { useGame } from "../context/GameContext";

export default function EKGScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div>
      <h2>EKG</h2>
      <p>{currentCase.klinik_bulgular.ekg}</p>
      <button onClick={nextStep}>Tetkikler</button>
    </div>
  );
}
