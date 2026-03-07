import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

const GRAFANA_BASE = import.meta.env.VITE_GRAFANA_URL ?? "http://localhost:3000";
const DASHBOARD_URL = `${GRAFANA_BASE}/d/backend-monitoring/backend-monitoring?orgId=1&refresh=5s`;

export default function Monitoring() {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="space-y-4">
      {/* TITLE */}
      <h2 className="text-2xl font-bold text-gray-800">System Monitoring</h2>

      {/* CARD */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        {/* GRAFANA DASHBOARD */}
        <div className="w-full h-[70vh] border rounded-lg overflow-hidden relative">
          {!loaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <span className="text-gray-500 text-sm">Loading Grafana dashboard…</span>
            </div>
          )}
          {error ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gray-50">
              <AlertCircle className="text-red-400" size={32} />
              <p className="text-red-500 text-sm">
                Failed to load Grafana dashboard. Please check that Grafana is running.
              </p>
            </div>
          ) : (
            <iframe
              src={DASHBOARD_URL}
              width="100%"
              height="100%"
              frameBorder="0"
              title="Grafana Monitoring Dashboard"
              // allow-same-origin is required for Grafana session cookies to work;
              // ensure Grafana is deployed behind the same domain/proxy in production.
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              onLoad={() => setLoaded(true)}
              onError={() => setError(true)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
