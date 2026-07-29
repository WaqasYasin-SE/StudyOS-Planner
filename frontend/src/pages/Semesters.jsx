import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import SemesterForm from "../components/semesters/SemesterForm";
import SemesterCard from "../components/semesters/SemesterCard";
import DeleteSemesterModal from "../components/semesters/DeleteSemesterModal";

import "../style/Semester.css";

function Semesters() {

    const [semesters, setSemesters] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingSemester, setEditingSemester] = useState(null);

    const [deleteSemester, setDeleteSemester] = useState(null);

    useEffect(() => {

        loadSemesters();

    }, []);

    const loadSemesters = async () => {

        try {

            const response = await api.get("/semesters/");

            setSemesters(response.data);

        }

        catch {

            toast.error("Failed to load semesters.");

        }

        finally {

            setLoading(false);

        }

    };

    const addSemester = async (data) => {

        try {

            const response = await api.post(

                "/semesters/",

                data

            );

            setSemesters([

                response.data,

                ...semesters

            ]);

            toast.success("Semester created successfully.");

        }

        catch {

            toast.error("Unable to create semester.");

        }

    };

    const updateSemester = async (id, data) => {

        try {

            const response = await api.put(

                `/semesters/${id}`,

                data

            );

            setSemesters(

                semesters.map((semester) =>

                    semester.id === id

                        ? response.data

                        : semester

                )

            );

            setEditingSemester(null);

            toast.success("Semester updated.");

        }

        catch {

            toast.error("Update failed.");

        }

    };

    const removeSemester = async () => {

        try {

            await api.delete(

                `/semesters/${deleteSemester.id}`

            );

            setSemesters(

                semesters.filter(

                    (semester) =>

                        semester.id !== deleteSemester.id

                )

            );

            setDeleteSemester(null);

            toast.success("Semester deleted.");

        }

        catch {

            toast.error("Delete failed.");

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="semester-page">

            <div className="semester-header">

                <h1>

                    Semesters

                </h1>

                <p>

                    Organize your academic semesters.

                </p>

            </div>

            <SemesterForm

                onSubmit={

                    editingSemester

                        ?

                        (data) => updateSemester(

                            editingSemester.id,

                            data

                        )

                        :

                        addSemester

                }

                editingSemester={editingSemester}

                cancelEdit={() =>

                    setEditingSemester(null)

                }

            />

            <div className="semester-grid">

                {

                    semesters.length === 0 ?

                        (

                            <div className="empty-state">

                                <h3>

                                    No semesters found.

                                </h3>

                                <p>

                                    Create your first semester to get started.

                                </p>

                            </div>

                        )

                        :

                        (

                            semesters.map((semester) => (

                                <SemesterCard

                                    key={semester.id}

                                    semester={semester}

                                    onEdit={() =>

                                        setEditingSemester(

                                            semester

                                        )

                                    }

                                    onDelete={() =>

                                        setDeleteSemester(

                                            semester

                                        )

                                    }

                                />

                            ))

                        )

                }

            </div>

            {

                deleteSemester &&

                (

                    <DeleteSemesterModal

                        semester={deleteSemester}

                        onConfirm={removeSemester}

                        onCancel={() =>

                            setDeleteSemester(null)

                        }

                    />

                )

            }

        </div>

    );

}

export default Semesters;