import { useNavigate } from "react-router-dom";

function QuickActions() {

    const navigate = useNavigate();

    const actions = [

        {
            title: "Dashboard",
            icon: "🏠",
            path: "/"
        },

        {
            title: "Semesters",
            icon: "🎓",
            path: "/semesters"
        },

        {
            title: "Subjects",
            icon: "📚",
            path: "/subjects"
        },

        {
            title: "Tasks",
            icon: "📝",
            path: "/tasks"
        },

        {
            title: "Study Sessions",
            icon: "⏱",
            path: "/study-sessions"
        },

        {
            title: "Analytics",
            icon: "📊",
            path: "/analytics"
        }

    ];

    return (

        <div className="quick-actions">

            <h2>

                Quick Actions

            </h2>

            <div className="quick-actions-grid">

                {

                    actions.map((action) => (

                        <button

                            key={action.path}

                            className="quick-action-btn"

                            onClick={() => navigate(action.path)}

                        >

                            <span className="quick-action-icon">

                                {action.icon}

                            </span>

                            <span>

                                {action.title}

                            </span>

                        </button>

                    ))

                }

            </div>

        </div>

    );

}

export default QuickActions;