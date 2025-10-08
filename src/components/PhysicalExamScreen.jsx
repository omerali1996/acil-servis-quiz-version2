import React from "react";
import { useGame } from "../context/GameContext";

export default function PhysicalExamScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  return (
    <div>
      <h2>Fizik Muayene</h2>
      <p>{currentCase.klinik_bulgular.fizik_muayene}</p>
      <button onClick={nextStep}>Radyolojik Görüntüler</button>
    </div>
  );
}
