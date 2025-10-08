import { createContext, useState, useContext } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [step, setStep] = useState(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));
  const resetGame = () => setStep(1);

  return (
    <GameContext.Provider value={{ step, nextStep, prevStep, resetGame }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);