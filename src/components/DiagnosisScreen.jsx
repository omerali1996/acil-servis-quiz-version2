import React, { useState } from "react";
import { useGame } from "../context/GameContext";

export default function DiagnosisScreen() {
  const { prevStep, resetGame, caseData, loadingCase, caseError } = useGame();
  const [guess, setGuess] = useState("");
  const [resultMsg, setResultMsg] = useState(null);

  if (loadingCase) return <div>Yükleniyor...</div>;
  if (caseError) return <div>Hata: {caseError}</div>;
  if (!caseData) return <div>Vaka yok.</div>;

  const correct = caseData.dogru_tani || caseData.dogruTani || caseData.correctDiagnosis || "";

  const check = () => {
    if (!guess.trim()) return setResultMsg({ ok: false, text: "Lütfen bir tahmin girin." });
    if (guess.trim().toLowerCase() === correct.trim().toLowerCase()) {
      setResultMsg({ ok: true, text: "Doğru! Tebrikler 🎉" });
    } else {
      setResultMsg({ ok: false, text: "Yanlış tahmin. Tekrar deneyin." });
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2 className="text-2xl">Hastalık Tahmini</h2>

      <input
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Tahmininizi yazın (örn: İnferior MI)"
        style={{ width: "100%", maxWidth: 480, padding: 10, borderRadius: 8, marginTop: 12, border: "1px solid #ddd" }}
      />

      <div style={{ marginTop: 12 }}>
        <button onClick={check} style={{ background: "#FFB84C", color: "#1E1E1E", padding: "8px 14px", borderRadius: 10, border: "none", fontWeight: 600 }}>
          Tahmin Et
        </button>
      </div>

      {resultMsg && (
        <div style={{ marginTop: 16 }}>
          <div style={{ color: resultMsg.ok ? "green" : "crimson", fontWeight: 600 }}>
            {resultMsg.text}
          </div>

          {resultMsg.ok && (
            <div style={{ marginTop: 12 }}>
              <button onClick={() => { resetGame(); setGuess(""); setResultMsg(null); }} style={{ background: "#4CAF50", color: "#fff", padding: "8px 12px", borderRadius: 10, border: "none" }}>
                Yeni vaka
              </button>
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <button onClick={prevStep} style={{ background: "#eee", padding: "8px 14px", borderRadius: 10, border: "none" }}>
          ← Geri
        </button>
        <button onClick={() => { resetGame(); setGuess(""); setResultMsg(null); }} style={{ background: "#ddd", padding: "8px 14px", borderRadius: 10, border: "none" }}>
          Baştan Başla
        </button>
      </div>
    </div>
  );
}
