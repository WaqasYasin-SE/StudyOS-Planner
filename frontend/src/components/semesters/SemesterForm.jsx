import { useEffect, useState } from "react";

function SemesterForm({

    onSubmit,

    editingSemester,

    cancelEdit

}) {

    const [name, setName] = useState("");

    const [durationWeeks, setDurationWeeks] = useState("");

    useEffect(() => {

        if (editingSemester) {

            setName(editingSemester.name);

            setDurationWeeks(

                editingSemester.duration_weeks

            );

        }

        else {

            setName("");

            setDurationWeeks("");

        }

    }, [editingSemester]);

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!name.trim()) {

            alert("Semester name is required.");

            return;

        }

        if (!durationWeeks || durationWeeks <= 0) {

            alert("Enter a valid duration.");

            return;

        }

        onSubmit({

            name,

            duration_weeks: Number(durationWeeks)

        });

        if (!editingSemester) {

            setName("");

            setDurationWeeks("");

        }

    };

    return (

        <form

            className="semester-form"

            onSubmit={handleSubmit}

        >

            <div className="form-group">

                <label>

                    Semester Name

                </label>

                <input

                    type="text"

                    value={name}

                    onChange={(e) =>

                        setName(e.target.value)

                    }

                    placeholder="e.g. Fall 2026"

                />

            </div>

            <div className="form-group">

                <label>

                    Duration (Weeks)

                </label>

                <input

                    type="number"

                    value={durationWeeks}

                    onChange={(e) =>

                        setDurationWeeks(e.target.value)

                    }

                    placeholder="16"

                />

            </div>

            <div className="form-buttons">

                <button type="submit">

                    {

                        editingSemester

                            ? "Update Semester"

                            : "Add Semester"

                    }

                </button>

                {

                    editingSemester && (

                        <button

                            type="button"

                            className="cancel-btn"

                            onClick={cancelEdit}

                        >

                            Cancel

                        </button>

                    )

                }

            </div>

        </form>

    );

}

export default SemesterForm;