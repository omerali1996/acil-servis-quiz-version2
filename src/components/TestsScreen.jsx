import React from "react";
import { useGame } from "../context/GameContext";

export default function TestsScreen() {
  const { nextStep, prevStep, caseData, loadingCase, caseError } = useGame();

  if (loadingCase) return <div>Yükleniyor...</div>;
  if (caseError) return <div>Hata: {caseError}</div>;
  if (!caseData) return <div>Vaka yok.</div>;

  const tetkik = caseData.tetkik || caseData.tetkikler || caseData.tests;

  return (
    <div>
      <h2 className="text-2xl">Tetkikler</h2>

      <div style={{ marginTop: 12, textAlign: "left" }}>
        { !tetkik && <div>Tetkik bilgisi yok.</div> }
        { typeof tetkik === "string" && <div>{tetkik}</div> }
        { typeof tetkik === "object" && (
          <ul>
            {Object.entries(tetkik).map(([k,v]) => (
              <li key={k}><strong>{k}:</strong> {v}</li>
            ))}
          </ul>
        )}
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
