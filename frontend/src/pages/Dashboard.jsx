import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import DashboardCard from "../components/dashboard/DashboardCard";
import QuickActions from "../components/dashboard/QuickActions";
import UpcomingTasks from "../components/dashboard/UpcomingTasks";
import RecentSessions from "../components/dashboard/RecentSessions";
import ProgressCard from "../components/dashboard/ProgressCard";

import "../style/Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/dashboard",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setDashboard(response.data);

        }

        catch {

            toast.error("Unable to load dashboard.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Dashboard...</h2>;

    }

    return (

        <div className="dashboard-page">

            <div className="dashboard-header">

                <h1>Dashboard</h1>

                <p>

                    Welcome back! Here's your study overview.

                </p>

            </div>

            {/* Statistics */}

            <div className="dashboard-grid">

                <DashboardCard
                    title="Semesters"
                    value={dashboard.total_semesters}
                    icon="🎓"
                />

                <DashboardCard
                    title="Subjects"
                    value={dashboard.total_subjects}
                    icon="📚"
                />

                <DashboardCard
                    title="Tasks"
                    value={dashboard.total_tasks}
                    icon="📝"
                />

                <DashboardCard
                    title="Study Hours"
                    value={dashboard.total_study_hours}
                    icon="⏱"
                />

            </div>

            <ProgressCard dashboard={dashboard} />

            <QuickActions />

            <div className="dashboard-lists">

                <UpcomingTasks

                    tasks={dashboard.upcoming_tasks}

                />

                <RecentSessions

                    sessions={dashboard.recent_sessions}

                />

            </div>

        </div>

    );

}

export default Dashboard;