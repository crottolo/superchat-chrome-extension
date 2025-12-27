import { useState, useEffect, useCallback } from "react";

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export function usePush() {
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check existing subscription on mount
  useEffect(() => {
    chrome.runtime.sendMessage({ type: "GET_SUBSCRIPTION" }, (response) => {
      if (response?.subscription) {
        setSubscription(response.subscription);
      }
      setLoading(false);
    });
  }, []);

  const subscribe = useCallback(async () => {
    setLoading(true);
    setError(null);

    return new Promise<PushSubscription>((resolve, reject) => {
      chrome.runtime.sendMessage({ type: "SUBSCRIBE_PUSH" }, (response) => {
        setLoading(false);
        if (response?.error) {
          setError(response.error);
          reject(new Error(response.error));
        } else if (response?.subscription) {
          setSubscription(response.subscription);
          resolve(response.subscription);
        }
      });
    });
  }, []);

  return { subscription, subscribe, loading, error };
}
