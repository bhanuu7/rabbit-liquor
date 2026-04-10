import { Wine } from "lucide-react";
import "./AgeVerification.css";

export default function AgeVerification({ onConfirm }) {
  const handleExit = () => {
    window.location.href = "about:blank";
  };

  return (
    <div className="av-overlay">
      <div className="av-card">
        {/* Branding */}
        <div className="av-brand">
          <div className="av-brand__icon">
            <Wine size={32} />
          </div>
          <p className="av-brand__label">Premium Spirits</p>
          <h1 className="av-brand__name">
            Rabbit <em>Liquor</em>
          </h1>
        </div>

        <div className="av-divider" />

        {/* Headline */}
        <div className="av-content">
          <h2 className="av-welcome">Welcome, Connoisseur</h2>
          <p className="av-message">
            Confirm you are of legal drinking age
          </p>
        </div>

        {/* Actions */}
        <div className="av-actions">
          <button className="av-btn av-btn--confirm" onClick={onConfirm}>
            YES I'M 21+
          </button>
          <button className="av-btn av-btn--exit" onClick={handleExit}>
            EXIT
          </button>
        </div>

        {/* Footer */}
        <sub className="av-footer">
          Drink responsibly &middot; Rabbit Liquor &copy; 2026
        </sub>
      </div>
    </div>
  );
}
