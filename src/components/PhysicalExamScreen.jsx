import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function PhysicalExamScreen({ gameState, onNext }) {
  const [examData, setExamData] = useState(null);

  useEffect(() => {
    const fetchExam = async () => {
      const res = await axios.get("http://127.0.0.1:5000/get_physical_exam");
      setExamData(res.data);
    };
    fetchExam();
  }, []);

  if (!examData) return <div>Loading physical exam...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">🩺 Physical Examination</h2>
      <div className="bg-white shadow p-6 rounded-2xl max-w-xl text-gray-800">
        {examData.physical_exam}
      </div>
      <Button className="mt-6" onClick={onNext}>
        Continue to EKG
      </Button>
    </div>
  );
}
