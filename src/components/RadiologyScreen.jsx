import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function RadiologyScreen({ onNext }) {
  const [radiology, setRadiology] = useState(null);

  useEffect(() => {
    const fetchRadiology = async () => {
      const res = await axios.get("http://127.0.0.1:5000/get_radiology");
      setRadiology(res.data);
    };
    fetchRadiology();
  }, []);

  if (!radiology) return <div>Loading radiology images...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">🩻 Radiology Findings</h2>
      <div className="bg-white shadow p-6 rounded-2xl max-w-xl text-gray-800">
        {radiology.radiology}
      </div>
      <Button className="mt-6" onClick={onNext}>
        Continue to Diagnosis
      </Button>
    </div>
  );
}
