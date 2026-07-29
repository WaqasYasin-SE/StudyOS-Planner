import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import SubjectForm from "../components/subjects/SubjectForm";
import SubjectCard from "../components/subjects/SubjectCard";
import DeleteSubjectModal from "../components/subjects/DeleteSubjectModal";


import "../style/Subject.css";

function Subjects() {

    // ==========================
    // State
    // ==========================

    const [subjects, setSubjects] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingSubject, setEditingSubject] = useState(null);

    const [deleteSubject, setDeleteSubject] = useState(null);

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

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Delete Subject
    // ==========================

    const removeSubject = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/subjects/${deleteSubject.id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setSubjects(

                subjects.filter(

                    (subject) =>

                        subject.id !== deleteSubject.id

                )

            );

            setDeleteSubject(null);

            toast.success("Subject deleted successfully.");

        }

        catch {

            toast.error("Unable to delete subject.");

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return <h2>Loading Subjects...</h2>;

    }

    // ==========================
    // UI
    // ==========================

    return (

        <div className="subjects-page">

            <div className="subjects-header">

                <h1>Subjects</h1>

                <p>

                    Manage your semester subjects.

                </p>

            </div>

            <SubjectForm

                editingSubject={editingSubject}

                setEditingSubject={setEditingSubject}

                loadSubjects={loadSubjects}

            />

            <div className="subjects-grid">

                {

                    subjects.length === 0 ?

                        (

                            <div className="empty-state">

                                <h3>

                                    No Subjects Found

                                </h3>

                                <p>

                                    Create your first subject.

                                </p>

                            </div>

                        )

                        :

                        (

                            subjects.map((subject) => (

                                <SubjectCard

                                    key={subject.id}

                                    subject={subject}

                                    onEdit={setEditingSubject}

                                    onDelete={() =>

                                        setDeleteSubject(subject)

                                    }

                                />

                            ))

                        )

                }

            </div>

            {

                deleteSubject &&

                (

                    <DeleteSubjectModal

                        subject={deleteSubject}

                        onConfirm={removeSubject}

                        onCancel={() =>

                            setDeleteSubject(null)

                        }

                    />

                )

            }

        </div>

    );

}

export default Subjects;