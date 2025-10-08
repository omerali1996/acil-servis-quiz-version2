import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";

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
      case 1: return <PatientHistoryScreen />;
      case 2: return <PhysicalExamScreen />;
      case 3: return <EKGScreen />;
      case 4: return <TestsScreen />;
      case 5: return <RadiologyScreen />;
      case 6: return <DiagnosisScreen />;
      default: return <PatientHistoryScreen />;
    }
  };

  return (
    <div className="container">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -60 }}
          transition={{ duration: 0.35 }}
        >
          <div className="card">{renderScreen()}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  );
}
