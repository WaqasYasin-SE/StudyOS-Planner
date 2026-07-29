import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");

    };

    return (

        <nav className="navbar" style={styles.navbar}>

            <style>{`
                .ss-logout-btn {
                    transition: background-color 0.15s ease, border-color 0.15s ease;
                }
                .ss-logout-btn:hover {
                    background-color: rgba(250, 248, 243, 0.08) !important;
                    border-color: rgba(250, 248, 243, 0.5) !important;
                }
                .ss-logout-btn:focus-visible {
                    outline: 2px solid #FF9F1C;
                    outline-offset: 2px;
                }
                .ss-navlogo:focus-visible {
                    outline: 2px solid #FF9F1C;
                    outline-offset: 3px;
                    border-radius: 4px;
                }
            `}</style>

            <div className="navbar-logo">

                <Link
                    to="/"
                    className="ss-navlogo"
                    style={styles.logoLink}
                >
                    <span style={styles.logoMark}>S</span>
                    <span style={styles.logoWordmark}>StudySprint</span>
                </Link>

            </div>

            <div className="navbar-right" style={styles.navRight}>

                <span style={styles.welcomeText}>
                    Welcome back
                </span>

                <div style={styles.avatar} aria-hidden="true">S</div>

                <button
                    className="ss-logout-btn"
                    onClick={handleLogout}
                    style={styles.logoutButton}
                >
                    Logout
                </button>

            </div>

        </nav>

    );

}

const styles = {

    navbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
        padding: "0 28px",
        backgroundColor: "#0F1629",
        color: "#FAF8F3",
        fontFamily: "'Inter', system-ui, sans-serif",
        flexShrink: 0
    },

    logoLink: {
        display: "flex",
        alignItems: "center",
        gap: "10px",
        textDecoration: "none"
    },

    logoMark: {
        width: "28px",
        height: "28px",
        borderRadius: "7px",
        backgroundColor: "#FF9F1C",
        color: "#0F1629",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "15px"
    },

    logoWordmark: {
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "18px",
        color: "#FAF8F3",
        letterSpacing: "0.01em"
    },

    navRight: {
        display: "flex",
        alignItems: "center",
        gap: "16px"
    },

    welcomeText: {
        fontSize: "13px",
        color: "rgba(250, 248, 243, 0.6)"
    },

    avatar: {
        width: "30px",
        height: "30px",
        borderRadius: "50%",
        backgroundColor: "#2EC4B6",
        color: "#0F1629",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "13px"
    },

    logoutButton: {
        padding: "8px 16px",
        fontSize: "13px",
        fontWeight: 600,
        fontFamily: "'Inter', sans-serif",
        color: "#FAF8F3",
        backgroundColor: "transparent",
        border: "1.5px solid rgba(250, 248, 243, 0.28)",
        borderRadius: "7px",
        cursor: "pointer"
    }

};

export default Navbar;