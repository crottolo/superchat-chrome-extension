import { useState } from "react";
import { usePush } from "../hooks/usePush";

export function SettingsPanel() {
  const { subscription, subscribe, loading, error } = usePush();
  const [copied, setCopied] = useState<string | null>(null);

  const handleSubscribe = async () => {
    try {
      await subscribe();
    } catch (e) {
      console.error("Subscribe error:", e);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="tv-settings">
      <div className="tv-settings-section">
        <h3 className="tv-settings-title">Push Notifications (VAPID)</h3>

        {loading ? (
          <div className="tv-settings-status tv-not-subscribed">
            <LoadingIcon />
            <span>Caricamento...</span>
          </div>
        ) : subscription ? (
          <>
            <div className="tv-settings-status tv-subscribed">
              <CheckCircleIcon />
              <span>Sottoscrizione attiva</span>
            </div>

            <div className="tv-settings-label">FCM Endpoint</div>
            <div className="tv-settings-value">
              {subscription.endpoint.slice(0, 60)}...
            </div>
            <button
              className="tv-settings-btn tv-settings-btn-secondary"
              onClick={() => copyToClipboard(subscription.endpoint, "endpoint")}
              style={{ marginBottom: 12 }}
            >
              {copied === "endpoint" ? <CheckIcon /> : <CopyIcon />}
              {copied === "endpoint" ? "Copiato!" : "Copia Endpoint"}
            </button>

            <div className="tv-settings-label">p256dh Key</div>
            <div className="tv-settings-value">
              {subscription.keys.p256dh.slice(0, 40)}...
            </div>

            <div className="tv-settings-label">Auth Key</div>
            <div className="tv-settings-value">{subscription.keys.auth}</div>

            <button
              className="tv-settings-btn tv-settings-btn-secondary"
              onClick={() =>
                copyToClipboard(JSON.stringify(subscription, null, 2), "full")
              }
            >
              {copied === "full" ? <CheckIcon /> : <CopyIcon />}
              {copied === "full" ? "Copiato!" : "Copia JSON Completo"}
            </button>
          </>
        ) : (
          <>
            <div className="tv-settings-status tv-not-subscribed">
              <WarningIcon />
              <span>Non sottoscritto</span>
            </div>

            <button
              className="tv-settings-btn tv-settings-btn-primary"
              onClick={handleSubscribe}
            >
              <BellIcon />
              Attiva Push Notifications
            </button>
          </>
        )}

        {error && (
          <div
            style={{ color: "#dc3545", fontSize: "0.8rem", marginTop: "8px" }}
          >
            Errore: {error}
          </div>
        )}
      </div>
    </div>
  );
}

function CheckCircleIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LoadingIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: "spin 1s linear infinite" }}
    >
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
    </svg>
  );
}
