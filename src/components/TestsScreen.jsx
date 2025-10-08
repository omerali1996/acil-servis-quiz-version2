import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

export default function TestsScreen({ onNext }) {
  const [tests, setTests] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      const res = await axios.get("http://127.0.0.1:5000/get_tests");
      setTests(res.data);
    };
    fetchTests();
  }, []);

  if (!tests) return <div>Loading test results...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">🧪 Laboratory Tests</h2>
      <div className="bg-white shadow p-6 rounded-2xl max-w-xl text-gray-800">
        {tests.tests}
      </div>
      <Button className="mt-6" onClick={onNext}>
        Continue to Radiology
      </Button>
    </div>
  );
}
