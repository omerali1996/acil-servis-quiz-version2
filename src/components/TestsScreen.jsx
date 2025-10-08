import React from "react";
import { useGame } from "../context/GameContext";

export default function TestsScreen() {
  const { cases, currentCaseIndex, nextStep } = useGame();
  const currentCase = cases[currentCaseIndex];

  if (!currentCase) return <p>Vaka yükleniyor...</p>;

  // Sadece tetkik bilgilerini gösteriyoruz — hikaye veya diğer alanlar yok
  const tetkikBilgisi = currentCase?.klinik_bulgular?.tetkikler;

  return (
    <div className="screen">
      <h2>🧫 Tetkikler</h2>

      <div className="screen-content">
        <p>{tetkikBilgisi ? tetkikBilgisi : "Tetkik bilgisi bulunamadı."}</p>
      </div>

      <div className="nav-buttons" style={{ justifyContent: "center" }}>
        <button className="btn btn-primary" onClick={nextStep}>
          🧩 Hastalığı Tahmin Et
        </button>
      </div>
    </div>
  );
}





