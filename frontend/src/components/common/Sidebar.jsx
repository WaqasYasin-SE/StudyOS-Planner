import { NavLink } from "react-router-dom";

// ==========================
// Nav items (order matches the app layout)
// ==========================

const navItems = [
    { to: "/", label: "Dashboard", end: true, icon: "grid" },
    { to: "/semesters", label: "Semesters", icon: "calendar" },
    { to: "/subjects", label: "Subjects", icon: "book" },
    { to: "/tasks", label: "Tasks", icon: "check" },
    { to: "/study-sessions", label: "Study Sessions", icon: "timer" },
    { to: "/analytics", label: "Analytics", icon: "bars" }
];

// ==========================
// Small inline icon set (no external deps)
// ==========================

function Icon({ name }) {

    const common = {
        width: 18,
        height: 18,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: 1.8,
        strokeLinecap: "round",
        strokeLinejoin: "round"
    };

    switch (name) {

        case "grid":
            return (
                <svg {...common}>
                    <rect x="3" y="3" width="8" height="8" rx="1.5" />
                    <rect x="13" y="3" width="8" height="8" rx="1.5" />
                    <rect x="3" y="13" width="8" height="8" rx="1.5" />
                    <rect x="13" y="13" width="8" height="8" rx="1.5" />
                </svg>
            );

        case "calendar":
            return (
                <svg {...common}>
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <line x1="8" y1="3" x2="8" y2="7" />
                    <line x1="16" y1="3" x2="16" y2="7" />
                </svg>
            );

        case "book":
            return (
                <svg {...common}>
                    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5v-17Z" />
                    <line x1="4" y1="19" x2="20" y2="19" />
                </svg>
            );

        case "check":
            return (
                <svg {...common}>
                    <rect x="3.5" y="3.5" width="17" height="17" rx="3" />
                    <path d="M8 12.5l2.5 2.5L16 9.5" />
                </svg>
            );

        case "timer":
            return (
                <svg {...common}>
                    <circle cx="12" cy="13" r="8" />
                    <line x1="12" y1="13" x2="12" y2="9" />
                    <line x1="10" y1="2.5" x2="14" y2="2.5" />
                </svg>
            );

        case "bars":
            return (
                <svg {...common}>
                    <line x1="5" y1="21" x2="5" y2="12" />
                    <line x1="12" y1="21" x2="12" y2="7" />
                    <line x1="19" y1="21" x2="19" y2="15" />
                </svg>
            );

        default:
            return null;

    }

}

function Sidebar() {

    return (

        <aside className="sidebar" style={styles.sidebar}>

            <style>{`
                .ss-navlink {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    margin-bottom: 4px;
                    border-radius: 8px;
                    font-size: 14px;
                    font-weight: 500;
                    color: #4B5266;
                    text-decoration: none;
                    border-left: 3px solid transparent;
                    transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;
                }
                .ss-navlink:hover {
                    background-color: rgba(255, 159, 28, 0.08);
                    color: #1A1F2E;
                }
                .ss-navlink:focus-visible {
                    outline: 2px solid #FF9F1C;
                    outline-offset: 2px;
                }
                .ss-navlink.active {
                    background-color: rgba(255, 159, 28, 0.12);
                    border-left-color: #FF9F1C;
                    color: #1A1F2E;
                    font-weight: 600;
                }
            `}</style>

            <span style={styles.eyebrow}>MENU</span>

            <ul style={styles.list}>

                {navItems.map((item) => (

                    <li key={item.to}>
                        <NavLink
                            to={item.to}
                            end={item.end}
                            className={({ isActive }) =>
                                "ss-navlink" + (isActive ? " active" : "")
                            }
                        >
                            <Icon name={item.icon} />
                            {item.label}
                        </NavLink>
                    </li>

                ))}

            </ul>

        </aside>

    );

}

const styles = {

    sidebar: {
        width: "230px",
        flexShrink: 0,
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E5E1D8",
        padding: "24px 16px",
        fontFamily: "'Inter', system-ui, sans-serif",
        overflowY: "auto"
    },

    eyebrow: {
        display: "block",
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: "11px",
        letterSpacing: "0.1em",
        color: "#9CA3AF",
        marginBottom: "14px",
        paddingLeft: "14px"
    },

    list: {
        listStyle: "none",
        padding: 0,
        margin: 0
    }

};

export default Sidebar;