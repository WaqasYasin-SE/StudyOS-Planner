import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

function StudySessionForm({

    editingSession,

    setEditingSession,

    refreshSessions

}) {

    // ==========================
    // State
    // ==========================

    const [subjects, setSubjects] = useState([]);

    const [subjectId, setSubjectId] = useState("");

    const [duration, setDuration] = useState("");

    const [startedAt, setStartedAt] = useState("");

    const [endedAt, setEndedAt] = useState("");

    const [loading, setLoading] = useState(false);

    // ==========================
    // Load Subjects
    // ==========================

    useEffect(() => {

        loadSubjects();

    }, []);

    const loadSubjects = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(
                "/subjects",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setSubjects(response.data);

        }

        catch {

            toast.error("Unable to load subjects.");

        }

    };

    // ==========================
    // Edit Mode
    // ==========================

    useEffect(() => {

        if (editingSession) {

            setSubjectId(editingSession.subject_id);

            setDuration(editingSession.duration_minutes);

            setStartedAt(
                editingSession.started_at || ""
            );

            setEndedAt(
                editingSession.ended_at || ""
            );

        }

    }, [editingSession]);

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const token = localStorage.getItem("token");

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            };

            const data = {

                subject_id: Number(subjectId),

                duration_minutes: Number(duration),

                started_at: startedAt || null,

                ended_at: endedAt || null

            };

            if (editingSession) {

                await api.put(

                    `/study-sessions/${editingSession.id}`,

                    data,

                    config

                );

                toast.success("Study session updated.");

            }

            else {

                await api.post(

                    "/study-sessions",

                    data,

                    config

                );

                toast.success("Study session created.");

            }

            // Reset Form

            setSubjectId("");

            setDuration("");

            setStartedAt("");

            setEndedAt("");

            setEditingSession(null);

            refreshSessions();

        }

        catch (error) {

            console.error(error);

            toast.error("Unable to save study session.");

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <form
            className="study-form"
            onSubmit={handleSubmit}
        >

            <h2>

                {

                    editingSession

                        ? "Edit Study Session"

                        : "New Study Session"

                }

            </h2>

            <select

                value={subjectId}

                onChange={(e) =>
                    setSubjectId(e.target.value)
                }

                required

            >

                <option value="">

                    Select Subject

                </option>

                {

                    subjects.map((subject) => (

                        <option

                            key={subject.id}

                            value={subject.id}

                        >

                            {subject.name}

                        </option>

                    ))

                }

            </select>

            <input

                type="number"

                placeholder="Duration (minutes)"

                value={duration}

                onChange={(e) =>
                    setDuration(e.target.value)
                }

                required

            />

            <label>

                Start Time

            </label>

            <input

                type="datetime-local"

                value={startedAt}

                onChange={(e) =>
                    setStartedAt(e.target.value)
                }

            />

            <label>

                End Time

            </label>

            <input

                type="datetime-local"

                value={endedAt}

                onChange={(e) =>
                    setEndedAt(e.target.value)
                }

            />

            <button

                type="submit"

                disabled={loading}

            >

                {

                    loading

                        ? "Saving..."

                        : editingSession

                            ? "Update Session"

                            : "Create Session"

                }

            </button>

            {

                editingSession &&

                <button

                    type="button"

                    onClick={() => {

                        setEditingSession(null);

                        setSubjectId("");

                        setDuration("");

                        setStartedAt("");

                        setEndedAt("");

                    }}

                >

                    Cancel

                </button>

            }

        </form>

    );

}

export default StudySessionForm;