import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function EKGScreen({ onNext }) {
  const [ekgData, setEkgData] = useState(null);

  useEffect(() => {
    const fetchEKG = async () => {
      const res = await axios.get("http://127.0.0.1:5000/get_ekg");
      setEkgData(res.data);
    };
    fetchEKG();
  }, []);

  if (!ekgData) return <div>Loading EKG data...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">📉 EKG Findings</h2>
      <div className="bg-white shadow p-6 rounded-2xl max-w-xl text-gray-800">
        {ekgData.ekg}
      </div>
      <Button className="mt-6" onClick={onNext}>
        Continue to Tests
      </Button>
    </div>
  );
}
