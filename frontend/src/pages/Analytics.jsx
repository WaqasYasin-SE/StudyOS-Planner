import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import AnalyticsCard from "../components/analytics/AnalyticsCard";
import StudyHoursChart from "../components/analytics/StudyHoursChart";
import TaskStatusChart from "../components/analytics/TaskStatusChart";
import ProgressSummary from "../components/analytics/ProgressSummary";

import "../style/Analytics.css";

function Analytics() {

    const [tasks, setTasks] = useState([]);

    const [sessions, setSessions] = useState([]);

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadAnalytics();

    }, []);

    const loadAnalytics = async () => {

        try {

            const token = localStorage.getItem("token");

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            };

            const [

                taskResponse,

                sessionResponse,

                subjectResponse

            ] = await Promise.all([

                api.get("/tasks", config),

                api.get("/study-sessions", config),

                api.get("/subjects", config)

            ]);

            setTasks(taskResponse.data);

            setSessions(sessionResponse.data);

            setSubjects(subjectResponse.data);

        }

        catch {

            toast.error("Unable to load analytics.");

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading Analytics...</h2>;

    }

    const completedTasks = tasks.filter(

        task => task.status === "Completed"

    ).length;

    const pendingTasks = tasks.length - completedTasks;

    const totalMinutes = sessions.reduce(

        (sum, session) => sum + session.duration_minutes,

        0

    );

    const totalHours = (totalMinutes / 60).toFixed(1);

    return (

        <div className="analytics-page">

            <div className="analytics-header">

                <h1>Analytics</h1>

                <p>

                    Track your study performance and productivity.

                </p>

            </div>

            <div className="analytics-grid">

                <AnalyticsCard

                    title="Study Hours"

                    value={totalHours}

                    icon="⏱"

                />

                <AnalyticsCard

                    title="Study Sessions"

                    value={sessions.length}

                    icon="📚"

                />

                <AnalyticsCard

                    title="Completed Tasks"

                    value={completedTasks}

                    icon="✅"

                />

                <AnalyticsCard

                    title="Subjects"

                    value={subjects.length}

                    icon="📖"

                />

            </div>

            <div className="analytics-content">

                <StudyHoursChart

                    sessions={sessions}

                />

                <TaskStatusChart

                    completed={completedTasks}

                    pending={pendingTasks}

                />

            </div>

            <ProgressSummary

                tasks={tasks}

                sessions={sessions}

            />

        </div>

    );

}

export default Analytics;