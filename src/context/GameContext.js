import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(1);
  const [cases, setCases] = useState([]);
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCases = async () => {
      try {
        setLoading(true);
        const res = await api.get("/api/cases");
        setCases(res.data);
      } catch (err) {
        setError(err.message || "Vaka yüklenemedi");
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const nextStep = () => setStep((s) => Math.min(6, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
  const resetGame = () => {
    setStep(1);
    setCurrentCaseIndex(0);
  };
  const nextCase = () => {
    setCurrentCaseIndex((i) => i + 1);
    setStep(1);
  };

  return (
    <GameContext.Provider
      value={{
        step,
        nextStep,
        prevStep,
        resetGame,
        cases,
        currentCaseIndex,
        loading,
        error,
        nextCase
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
};
