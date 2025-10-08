import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [caseData, setCaseData] = useState(null);
  const [loadingCase, setLoadingCase] = useState(true);
  const [caseError, setCaseError] = useState(null);

  useEffect(() => {
    const fetchCase = async () => {
      try {
        setLoadingCase(true);
        const res = await api.get("/diseases");
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCaseData(res.data[0]);
        } else {
          setCaseError("Vaka bulunamadı.");
        }
      } catch (err) {
        setCaseError(err.message || "Vaka yüklenemedi.");
      } finally {
        setLoadingCase(false);
      }
    };
    fetchCase();
  }, []);

  const nextStep = () => setStep((s) => Math.min(6, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
  const resetGame = () => setStep(1);

  return (
    <GameContext.Provider value={{ step, nextStep, prevStep, resetGame, caseData, loadingCase, caseError }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};