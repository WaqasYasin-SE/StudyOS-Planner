import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import StudySessionForm from "../components/studySessions/StudySessionForm";
import StudySessionCard from "../components/studySessions/StudySessionCard";
import DeleteStudySessionModal from "../components/studySessions/DeleteStudySessionModal";

import "../style/StudySession.css";

function StudySessions() {

    // ==========================
    // State
    // ==========================

    const [sessions, setSessions] = useState([]);

    const [editingSession, setEditingSession] = useState(null);

    const [deleteSession, setDeleteSession] = useState(null);

    const [loading, setLoading] = useState(true);

    // ==========================
    // Load Sessions
    // ==========================

    useEffect(() => {

        loadSessions();

    }, []);

    const loadSessions = async () => {

        try {

            setLoading(true);

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/study-sessions",

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setSessions(response.data);

        }

        catch (error) {

            console.error(error);

            toast.error("Failed to load study sessions.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Delete Session
    // ==========================

    const removeSession = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/study-sessions/${deleteSession.id}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setSessions(

                sessions.filter(

                    (session) =>

                        session.id !== deleteSession.id

                )

            );

            setDeleteSession(null);

            toast.success("Study session deleted.");

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to delete study session.");

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return (

            <div className="study-loading">

                <h2>

                    Loading Study Sessions...

                </h2>

            </div>

        );

    }

    // ==========================
    // UI
    // ==========================

    return (

        <div className="study-page">

            <div className="study-header">

                <h1>

                    Study Sessions

                </h1>

                <p>

                    Track every study session and monitor your learning time.

                </p>

            </div>

            <StudySessionForm

                editingSession={editingSession}

                setEditingSession={setEditingSession}

                refreshSessions={loadSessions}

            />

            <div className="study-list">

                {

                    sessions.length === 0 ?

                        (

                            <div className="empty-card">

                                <h3>

                                    No Study Sessions

                                </h3>

                                <p>

                                    Start your first study session.

                                </p>

                            </div>

                        )

                        :

                        (

                            sessions.map((session) => (

                                <StudySessionCard

                                    key={session.id}

                                    session={session}

                                    onEdit={setEditingSession}

                                    onDelete={() =>

                                        setDeleteSession(session)

                                    }

                                />

                            ))

                        )

                }

            </div>

            {

                deleteSession &&

                (

                    <DeleteStudySessionModal

                        session={deleteSession}

                        onConfirm={removeSession}

                        onCancel={() =>

                            setDeleteSession(null)

                        }

                    />

                )

            }

        </div>

    );

}

export default StudySessions;