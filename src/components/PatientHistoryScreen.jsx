import React, { useState } from "react";
import api from "../api";
import { useGame } from "../context/GameContext";

export default function PatientHistoryScreen() {
  const { nextStep, caseData, loadingCase, caseError } = useGame();
  const [question, setQuestion] = useState("");
  const [chat, setChat] = useState([]);
  const [asking, setAsking] = useState(false);

  if (loadingCase) return <div>Vaka yükleniyor...</div>;
  if (caseError) return <div>Hata: {caseError}</div>;
  if (!caseData) return <div>Vaka bulunamadı.</div>;

  const sendQuestion = async () => {
    const q = question.trim();
    if (!q) return;
    setAsking(true);
    try {
      const res = await api.post("/chat", { question: q });
      const answer = res.data?.answer ?? String(res.data);
      setChat((p) => [...p, { q, a: answer }]);
      setQuestion("");
    } catch (err) {
      setChat((p) => [...p, { q, a: "Sunucuya bağlanılamadı." }]);
    } finally {
      setAsking(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl">Hasta Öyküsü</h2>
      <p className="small-muted mb-4">Öykü:</p>

      <div style={{ marginBottom: 16 }}>
        <div className="bg-white p-4 rounded-md" style={{ border: "1px solid #eee" }}>
          {caseData.oyku || "Öykü mevcut değil."}
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <input
          type="text"
          placeholder="Doktor sorusu (örn: Ağrı ne zaman başladı?)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-2"
          style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #ddd" }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={sendQuestion}
            style={{
              background: "#FFB84C",
              color: "#1E1E1E",
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
              fontWeight: 600,
            }}
            disabled={asking}
          >
            {asking ? "Soruluyor..." : "Soruyu Gönder"}
          </button>

          <button
            onClick={() => { setQuestion(""); setChat([]); }}
            style={{
              background: "#eee",
              color: "#333",
              padding: "10px 14px",
              borderRadius: 12,
              border: "none",
            }}
          >
            Temizle
          </button>
        </div>
      </div>

      <div style={{ marginTop: 18, textAlign: "left", maxWidth: 680, marginLeft: "auto", marginRight: "auto" }}>
        {chat.map((c, i) => (
          <div key={i} style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 14 }}><strong>Doktor:</strong> {c.q}</div>
            <div style={{ color: "#0B61FF" }}><strong>Hasta:</strong> {c.a}</div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <button
          onClick={nextStep}
          style={{
            background: "#4CAF50",
            color: "white",
            padding: "10px 16px",
            borderRadius: 12,
            border: "none",
            fontWeight: 600,
          }}
        >
          Devam Et →
        </button>
      </div>
    </div>
  );
}
