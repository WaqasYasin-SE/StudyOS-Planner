import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import api from "../api/api";
import "../style/Register.css";

function Register() {

    // ==========================
    // State
    // ==========================

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    // ==========================
    // Register Function
    // ==========================

    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            await api.post("/auth/register", {
                full_name: fullName,
                email: email,
                password: password
            });

            setSuccess("Registration successful. Redirecting to login...");

            window.setTimeout(() => {
                navigate("/login", { replace: true });
            }, 2000);

        }

        catch (err) {

            if (err.response) {

                if (typeof err.response.data.detail === "string") {

                    setError(err.response.data.detail);

                }

                else {

                    setError("Registration failed.");

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
                        Your first sprint<br />starts today.
                    </h1>
                    <p className="ss-hero-sub">
                        Create an account to start running focused, timed
                        study sprints and track your streak from day one.
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
                        <circle cx="8" cy="45" r="7" fill="#FF9F1C" />
                        {[1, 2, 3].map((i) => (
                            <circle key={i}
                                cx={8 + i * 88}
                                cy="45"
                                r="4"
                                fill="#0F1629"
                                stroke="rgba(250,248,243,0.4)"
                                strokeWidth="1.5"
                            />
                        ))}
                    </svg>
                    <div className="ss-track-label-row">
                        <span className="ss-track-label">READY TO START</span>
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
                        <span className="ss-form-eyebrow">GET STARTED</span>
                        <h2 className="ss-form-title">Create your account</h2>
                    </div>

                    <form onSubmit={handleRegister} noValidate>

                        <label htmlFor="fullName" className="ss-label">Full name</label>

                        <input
                            id="fullName"
                            className="ss-input"
                            type="text"
                            placeholder=" Enter your name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />

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
                                placeholder="Create a password"
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

                        {

                            success &&

                            <p role="status" className="ss-success-text">
                                {success} If nothing happens, <Link to="/login" className="ss-link">click here</Link>.
                            </p>

                        }

                        <button
                            type="submit"
                            className="ss-btn ss-submit-button"
                            disabled={loading}
                        >
                            {loading ? "Creating account…" : "Create account"}
                        </button>

                    </form>

                    <p className="ss-helper-text">
                        Already have an account? <Link to="/login" className="ss-link">Log in</Link>
                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;