import React from "react";
import { useGame } from "../context/GameContext";

export default function RadiologyScreen() {
  const { nextStep, prevStep, caseData, loadingCase, caseError } = useGame();

  if (loadingCase) return <div>Yükleniyor...</div>;
  if (caseError) return <div>Hata: {caseError}</div>;
  if (!caseData) return <div>Vaka yok.</div>;

  return (
    <div>
      <h2 className="text-2xl">Radyolojik Görüntüler</h2>

      <div style={{ marginTop: 12 }}>
        {caseData.radyoloji || "Radyoloji bilgisi yok."}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={prevStep} style={{ background: "#eee", padding: "8px 14px", borderRadius: 10, border: "none" }}>
          ← Geri
        </button>
        <button onClick={nextStep} style={{ background: "#4CAF50", color: "#fff", padding: "8px 14px", borderRadius: 10, border: "none" }}>
          Sonraki →
        </button>
      </div>
    </div>
  );
}
