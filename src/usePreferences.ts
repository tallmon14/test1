import { useCallback, useEffect, useState } from "react";
import type { Preferences } from "./types";

const STORAGE_KEY = "nsd.prefs";

const DEFAULTS: Preferences = {
  persona: "consultative",
  theme: "light",
  density: "comfortable",
  accent: "#6a3df5",
};

function load(): Preferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULTS, ...(JSON.parse(raw) as Partial<Preferences>) };
  } catch {
    // ignore malformed storage
  }
  return DEFAULTS;
}

export function usePreferences() {
  const [prefs, setPrefs] = useState<Preferences>(load);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", prefs.theme);
    root.setAttribute("data-density", prefs.density);
    root.style.setProperty("--accent", prefs.accent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // ignore quota errors
    }
  }, [prefs]);

  const setPref = useCallback(
    <K extends keyof Preferences>(key: K, value: Preferences[K]) => {
      setPrefs((p) => ({ ...p, [key]: value }));
    },
    [],
  );

  return { prefs, setPref };
}
