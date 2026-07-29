import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

function SubjectForm({

    editingSubject,

    setEditingSubject,

    loadSubjects

}) {

    // ==========================
    // State
    // ==========================

    const [name, setName] = useState("");

    const [dailyStudyTarget, setDailyStudyTarget] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [semesterId, setSemesterId] = useState("");

    const [semesters, setSemesters] = useState([]);

    // ==========================
    // Load Semesters
    // ==========================

    useEffect(() => {

        loadSemesters();

    }, []);

    const loadSemesters = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/semesters",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setSemesters(response.data);

        }

        catch {

            toast.error("Unable to load semesters.");

        }

    };

    // ==========================
    // Fill Form (Edit)
    // ==========================

    useEffect(() => {

        if (!editingSubject) {

            return;

        }

        setName(editingSubject.name);

        setDailyStudyTarget(

            editingSubject.daily_study_target

        );

        setPriority(editingSubject.priority);

        setSemesterId(editingSubject.semester_id);

    }, [editingSubject]);

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const body = {

                name,

                daily_study_target: Number(dailyStudyTarget),

                priority,

                semester_id: Number(semesterId)

            };

            if (editingSubject) {

                await api.patch(
                    `/subjects/${editingSubject.id}`,
                    body,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                toast.success("Subject updated.");

            }

            else {

                await api.post(

                    "/subjects",

                    body,

                    {

                        headers: {

                            Authorization: `Bearer ${token}`

                        }

                    }

                );

                toast.success("Subject created.");

            }

            // Reset Form

            setName("");

            setDailyStudyTarget("");

            setPriority("Medium");

            setSemesterId("");

            setEditingSubject(null);

            loadSubjects();

        }

        catch (err) {

            if (err.response) {

                toast.error(err.response.data.detail);

            }

            else {

                toast.error("Something went wrong.");

            }

        }

    };

    return (

        <form

            className="subject-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    editingSubject

                        ? "Edit Subject"

                        : "Create Subject"

                }

            </h2>

            <input

                type="text"

                placeholder="Subject Name"

                value={name}

                onChange={(e) =>

                    setName(e.target.value)

                }

                required

            />

            <input

                type="number"

                placeholder="Daily Study Target (minutes)"

                value={dailyStudyTarget}

                onChange={(e) =>

                    setDailyStudyTarget(e.target.value)

                }

                required

            />

            <select

                value={priority}

                onChange={(e) =>

                    setPriority(e.target.value)

                }

            >

                <option value="Low">

                    Low

                </option>

                <option value="Medium">

                    Medium

                </option>

                <option value="High">

                    High

                </option>

            </select>

            <select

                value={semesterId}

                onChange={(e) =>

                    setSemesterId(e.target.value)

                }

                required

            >

                <option value="">

                    Select Semester

                </option>

                {

                    semesters.map((semester) => (

                        <option

                            key={semester.id}

                            value={semester.id}

                        >

                            {semester.name}

                        </option>

                    ))

                }

            </select>

            <button type="submit">

                {

                    editingSubject

                        ? "Update Subject"

                        : "Create Subject"

                }

            </button>

            {

                editingSubject &&

                <button

                    type="button"

                    onClick={() => {

                        setEditingSubject(null);

                        setName("");

                        setDailyStudyTarget("");

                        setPriority("Medium");

                        setSemesterId("");

                    }}

                >

                    Cancel

                </button>

            }

        </form >

    );

}

export default SubjectForm;