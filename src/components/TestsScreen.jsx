import React from "react";
import { useGame } from "../context/GameContext";

export default function TestsScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div>
      <h2>Tetkikler</h2>
      <p>{currentCase.klinik_bulgular.tetkikler}</p>
      <button onClick={nextStep}>Hastalığı Tahmin Et</button>
    </div>
  );
}
