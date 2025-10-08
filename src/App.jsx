import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GameProvider, useGame } from "./context/GameContext";

import PatientHistoryScreen from "./components/PatientHistoryScreen";
import PhysicalExamScreen from "./components/PhysicalExamScreen";
import EKGScreen from "./components/EKGScreen";
import TestsScreen from "./components/TestsScreen";
import RadiologyScreen from "./components/RadiologyScreen";
import DiagnosisScreen from "./components/DiagnosisScreen";
import "./index.css";

function GameFlow() {
  const { step, cases, currentCaseIndex } = useGame();
  const totalSteps = 6;

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

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="container">
      <div className="app-header">
        <div className="brand">
          <div className="logo">MD</div>
          <div>
            <div className="title">Medical Diagnosis Game</div>
            <div className="subtitle">Vaka {currentCaseIndex + 1} / {cases.length || "—"}</div>
          </div>
        </div>

        <div style={{textAlign:"right"}}>
          <div className="kv">Adımlar</div>
          <div style={{width:220}}>
            <div className="stepper" aria-hidden>
              <div className="steps" style={{flex:1}}>
                <div className="step" title={`${progressPercent}% tamamlandı`}>
                  <div className="fill" style={{ width: `${progressPercent}%` }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card" role="main" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.28 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </div>
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
