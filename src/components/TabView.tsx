import { useState, useEffect } from "react";
import { ChatList } from "./ChatList";
import { SettingsPanel } from "./SettingsPanel";
import { assignedChats, unassignedChats } from "../data/mockData";

type TabType = "assigned" | "unassigned" | "settings";
type ThemeType = "light" | "dark" | "system";

export function TabView() {
  const [activeTab, setActiveTab] = useState<TabType>("assigned");
  const [theme, setTheme] = useState<ThemeType>(() => {
    const saved = localStorage.getItem("theme") as ThemeType;
    return saved || "system";
  });

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      root.setAttribute("data-theme", isDark ? "dark" : "light");
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => applyTheme(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      applyTheme(theme === "dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const cycleTheme = () => {
    setTheme((prev) => {
      const next =
        prev === "light" ? "dark" : prev === "dark" ? "system" : "light";
      localStorage.setItem("theme", next);
      return next;
    });
  };

  const assignedCount = assignedChats.reduce((sum, c) => sum + c.unread, 0);
  const unassignedCount = unassignedChats.length;

  return (
    <div className="tv-dropdown">
      <div className="tv-menu">
        {/* Header with Tabs */}
        <div className="tv-header">
          <button
            className={`tv-tab ${activeTab === "assigned" ? "tv-active" : ""}`}
            onClick={() => setActiveTab("assigned")}
          >
            <UserIcon />
            Assigned
            {assignedCount > 0 && (
              <span className="tv-badge tv-badge-success">{assignedCount}</span>
            )}
          </button>
          <button
            className={`tv-tab ${activeTab === "unassigned" ? "tv-active" : ""}`}
            onClick={() => setActiveTab("unassigned")}
          >
            <UserPlusIcon />
            Not Assigned
            {unassignedCount > 0 && (
              <span className="tv-badge tv-badge-warning">
                {unassignedCount}
              </span>
            )}
          </button>
          <button
            className={`tv-tab ${activeTab === "settings" ? "tv-active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            <SettingsIcon />
            Settings
          </button>
          <button
            className="tv-header-btn"
            title={`Theme: ${theme}`}
            onClick={cycleTheme}
            style={{ marginLeft: "auto" }}
          >
            {theme === "light" && <SunIcon />}
            {theme === "dark" && <MoonIcon />}
            {theme === "system" && <SystemIcon />}
          </button>
        </div>

        {/* Content */}
        {activeTab === "assigned" && <ChatList chats={assignedChats} />}
        {activeTab === "unassigned" && <ChatList chats={unassignedChats} />}
        {activeTab === "settings" && <SettingsPanel />}

        {/* Footer */}
        {activeTab !== "settings" && (
          <div className="tv-footer">
            <button className="tv-footer-btn">
              {activeTab === "assigned"
                ? "View All Chats"
                : "View All Unassigned"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UserPlusIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="8.5" cy="7" r="4" />
      <line x1="20" y1="8" x2="20" y2="14" />
      <line x1="17" y1="11" x2="23" y2="11" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
