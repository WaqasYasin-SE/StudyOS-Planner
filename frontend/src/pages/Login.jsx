import { useState } from "react";
import { useAuth } from "../context/AuthContext";

import api from "../api/api";
import "../style/Login.css";
function Login() {

    // ==========================
    // State
    // ==========================

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login } = useAuth();


    // ==========================
    // Login Function
    // ==========================

    const handleLogin = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            // OAuth2PasswordRequestForm expects
            // username + password
            const formData = new URLSearchParams();

            formData.append("username", email);
            formData.append("password", password);

            const response = await api.post(
                "/auth/login",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                }
            );

            await login(response.data.access_token);

        }

        catch (err) {

            if (err.response) {

                if (typeof err.response.data.detail === "string") {

                    setError(err.response.data.detail);

                }

                else {

                    setError("Login failed.");

                }

            }

            else {

                setError("Unable to connect to the server.");

            }

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // UI
    // ==========================

    return (

        <div className="ss-page">

            {/* ================= LEFT PANEL ================= */}
            <div className="ss-panel-left">

                <div className="ss-brand-row">
                    <div className="ss-brand-mark">S</div>
                    <span className="ss-brand-name">StudySprint</span>
                </div>

                <div className="ss-hero-copy">
                    <h1 className="ss-hero-headline">
                        Every sprint<br />starts here.
                    </h1>
                    <p className="ss-hero-sub">
                        Log back in and pick up your next focused study
                        session exactly where you left off.
                    </p>
                </div>

                {/* Signature element: the sprint track */}
                <div className="ss-track-wrap" aria-hidden="true">
                    <svg
                        viewBox="0 0 280 90"
                        width="100%"
                        height="90"
                        style={{ overflow: "visible" }}
                    >
                        <line x1="8" y1="45" x2="272" y2="45"
                            stroke="rgba(250,248,243,0.16)"
                            strokeWidth="10"
                            strokeLinecap="round"
                        />
                        <path
                            className="ss-track-progress"
                            d="M8,45 H272"
                            stroke="#2EC4B6"
                            strokeWidth="10"
                            strokeLinecap="round"
                            fill="none"
                        />
                        {[0, 1, 2, 3].map((i) => (
                            <circle key={i}
                                cx={8 + i * 88}
                                cy="45"
                                r="4"
                                fill="#0F1629"
                                stroke="rgba(250,248,243,0.4)"
                                strokeWidth="1.5"
                            />
                        ))}
                        <circle cx="272" cy="45" r="7" fill="#FF9F1C" />
                    </svg>
                    <div className="ss-track-label-row">
                        <span className="ss-track-label">SESSION START</span>
                        <span className="ss-track-label-mono">25:00</span>
                    </div>
                </div>

                <p className="ss-hero-footnote">
                    Built for focused, timed study sprints — not endless scrolling.
                </p>

            </div>

            {/* ================= RIGHT PANEL ================= */}
            <div className="ss-panel-right">

                <div className="ss-form-card">

                    <div className="ss-form-header">
                        <span className="ss-form-eyebrow">WELCOME BACK</span>
                        <h2 className="ss-form-title">Log in to your account</h2>
                    </div>

                    <form onSubmit={handleLogin} noValidate>

                        <label htmlFor="email" className="ss-label">Email</label>

                        <input
                            id="email"
                            className="ss-input"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <label htmlFor="password" className="ss-label">Password</label>

                        <div className="ss-password-row">
                            <input
                                id="password"
                                className="ss-input ss-password-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="ss-eye"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>

                        {

                            error &&

                            <p role="alert" className="ss-error-text">
                                {error}
                            </p>

                        }

                        <button
                            type="submit"
                            className="ss-btn ss-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Logging in…" : "Start sprint"}
                        </button>

                    </form>

                    <p className="ss-helper-text">
                        New to StudySprint? <a href="/register" className="ss-link">Create an account</a>
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;