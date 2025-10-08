import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function DiagnosisScreen({ onNext }) {
  const [diagnosis, setDiagnosis] = useState("");
  const [result, setResult] = useState(null);

  const checkDiagnosis = async () => {
    const res = await axios.post("http://127.0.0.1:5000/check_diagnosis", {
      diagnosis,
    });
    setResult(res.data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">🧠 Diagnosis</h2>

      <input
        className="border rounded-lg p-3 w-80 text-center mb-4"
        type="text"
        placeholder="Enter your diagnosis"
        value={diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
      />

      <Button onClick={checkDiagnosis}>Submit</Button>

      {result && (
        <div className="mt-6 text-lg">
          {result.correct ? (
            <div className="text-green-600 font-bold">
              ✅ Correct! Proceed to next patient.
              <Button className="ml-4" onClick={onNext}>
                Next Case
              </Button>
            </div>
          ) : (
            <div className="text-red-600">❌ Incorrect. Try again.</div>
          )}
        </div>
      )}
    </div>
  );
}
