import type { Preferences } from "../types";
import { ACCENTS } from "../data";

interface Props {
  prefs: Preferences;
  setPref: <K extends keyof Preferences>(key: K, value: Preferences[K]) => void;
  onClose: () => void;
}

function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="seg" role="group">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={`seg__btn${value === o.value ? " is-active" : ""}`}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SettingsSheet({ prefs, setPref, onClose }: Props) {
  return (
    <div className="settings-backdrop" onClick={onClose}>
      <div
        className="settings"
        role="dialog"
        aria-label="Preferences"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="settings__head">
          <div className="settings__title">Preferences</div>
          <button type="button" className="settings__close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="settings__section">
          <div className="settings__section-label">Agent</div>
          <div className="settings__field">
            <div className="settings__field-label">Persona</div>
            <Segmented
              value={prefs.persona}
              onChange={(v) => setPref("persona", v)}
              options={[
                { value: "consultative", label: "Consultative" },
                { value: "analytical", label: "Analytical" },
                { value: "opinionated", label: "Opinionated" },
              ]}
            />
          </div>
        </div>

        <div className="settings__section">
          <div className="settings__section-label">Appearance</div>
          <div className="settings__field">
            <div className="settings__field-label">Theme</div>
            <Segmented
              value={prefs.theme}
              onChange={(v) => setPref("theme", v)}
              options={[
                { value: "light", label: "Light" },
                { value: "dark", label: "Dark" },
              ]}
            />
          </div>
          <div className="settings__field">
            <div className="settings__field-label">Density</div>
            <Segmented
              value={prefs.density}
              onChange={(v) => setPref("density", v)}
              options={[
                { value: "comfortable", label: "Comfortable" },
                { value: "compact", label: "Compact" },
              ]}
            />
          </div>
          <div className="settings__field">
            <div className="settings__field-label">Accent</div>
            <div className="swatches">
              {ACCENTS.map((a) => (
                <button
                  key={a.value}
                  type="button"
                  className={`swatch${prefs.accent === a.value ? " is-active" : ""}`}
                  style={{ background: a.value }}
                  aria-label={a.name}
                  aria-pressed={prefs.accent === a.value}
                  onClick={() => setPref("accent", a.value)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
