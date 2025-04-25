// NetworkContext.jsx
import { createContext, useEffect, useState } from "react";

export const NetworkContext = createContext();

export const NetworkProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  const checkInternetConnection = async () => {
    try {
      const res = await fetch("/health-check", { cache: "no-store" });
      return res.ok;
    } catch {
      return false;
    }
  };

  const updateOnlineStatus = async () => {
    if (!navigator.onLine) {
      console.log("🌐 Browser reports offline");
      setIsOnline(false);
      return;
    }
    const realOnline = await checkInternetConnection();
    console.log(`🌐 Network status: ${realOnline ? 'online' : 'offline'}`);
    setIsOnline(realOnline);
  };

  useEffect(() => {
    window.addEventListener("online", updateOnlineStatus);
    window.addEventListener("offline", updateOnlineStatus);
    updateOnlineStatus();

    return () => {
      window.removeEventListener("online", updateOnlineStatus);
      window.removeEventListener("offline", updateOnlineStatus);
    };
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};

export default NetworkContext;
