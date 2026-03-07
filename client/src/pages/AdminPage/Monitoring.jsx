import React from "react";
import { Activity } from "lucide-react";

export default function Monitoring() {
  return (
    <div className="space-y-4">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">System Monitoring</h2>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* GRAFANA DASHBOARD */}
        <div className="w-full h-[70vh] border rounded-lg overflow-hidden">
          <iframe
            src="http://localhost:3000/d/backend-monitoring/backend-monitoring?orgId=1&refresh=5s"
            width="100%"
            height="100%"
            frameBorder="0"
            title="Grafana Monitoring Dashboard"
          />
        </div>
      </div>
    </div>
  );
}
