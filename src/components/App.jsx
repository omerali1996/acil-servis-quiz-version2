import React from "react";
import { GameProvider, useGame } from "./context/GameContext";
import { AnimatePresence, motion } from "framer-motion";
import PatientHistoryScreen from "./components/PatientHistoryScreen";
import PhysicalExamScreen from "./components/PhysicalExamScreen";
import EKGScreen from "./components/EKGScreen";
import TestsScreen from "./components/TestsScreen";
import RadiologyScreen from "./components/RadiologyScreen";
import DiagnosisScreen from "./components/DiagnosisScreen";

function GameFlow() {
  const { step } = useGame();

  const renderScreen = () => {
    switch (step) {
      case 1:
        return <PatientHistoryScreen />;
      case 2:
        return <PhysicalExamScreen />;
      case 3:
        return <EKGScreen />;
      case 4:
        return <TestsScreen />;
      case 5:
        return <RadiologyScreen />;
      case 6:
        return <DiagnosisScreen />;
      default:
        return <div>Oyun bitti 🎉</div>;
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -80 }}
        transition={{ duration: 0.4 }}
      >
        {renderScreen()}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <GameProvider>
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
          <GameFlow />
        </div>
      </div>
    </GameProvider>
  );
}
