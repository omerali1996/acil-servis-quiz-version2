import React from "react";
import { useGame } from "../context/GameContext";

export default function PhysicalExamScreen() {
  const { nextStep, prevStep, caseData, loadingCase, caseError } = useGame();

  if (loadingCase) return <div>Yükleniyor...</div>;
  if (caseError) return <div>Hata: {caseError}</div>;
  if (!caseData) return <div>Vaka yok.</div>;

  const fizik = caseData.fizik;

  const renderPhysical = () => {
    if (!fizik) return "Fizik muayene bilgisi yok.";
    if (typeof fizik === "string") return fizik;
    return (
      <ul style={{ textAlign: "left", display: "inline-block" }}>
        {Object.entries(fizik).map(([k, v]) => (
          <li key={k}><strong>{k}:</strong> {v}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h2 className="text-2xl">Fizik Muayene</h2>
      <div style={{ marginTop: 12 }}>{renderPhysical()}</div>

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
