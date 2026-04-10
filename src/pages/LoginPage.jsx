import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wine } from "lucide-react";
import "./LoginPage.css";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Login API
    setIsLoading(false);
    navigate("/home");
  };
  return (
    <div className="lp-shell">
      <div className="lp-card">
        {/* Brand */}
        <div className="lp-brand">
          <div className="lp-brand__icon">
            <Wine size={26} />
          </div>
          <p className="lp-brand__pre">Premium Spirits</p>
          <h1 className="lp-brand__title">
            Welcome to <em>Rabbit Liquor</em>
          </h1>
          <p className="lp-brand__sub">Sign in to access your account</p>
        </div>

        <div className="lp-divider" />

        {/* Form */}
        <form className="lp-form" onSubmit={handleLogin}>
          <div className="lp-field">
            <label htmlFor="lp-email">Email</label>
            <input
              id="lp-email"
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="lp-field">
            <label htmlFor="lp-password">Password</label>
            <input
              id="lp-password"
              type="password"
              required
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button type="submit" className="lp-submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="lp-spinner" />
                Signing in…
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="lp-footer">
          Don&apos;t have an account?{" "}
          <button type="button" className="lp-footer__link">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}


