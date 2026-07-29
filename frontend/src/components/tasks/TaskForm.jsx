import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../../api/api";

function TaskForm({

    editingTask,

    setEditingTask,

    loadTasks

}) {

    // ==========================
    // State
    // ==========================

    const [title, setTitle] = useState("");

    const [description, setDescription] = useState("");

    const [deadline, setDeadline] = useState("");

    const [priority, setPriority] = useState("Medium");

    const [status, setStatus] = useState("Not Started");

    const [subjectId, setSubjectId] = useState("");

    const [subjects, setSubjects] = useState([]);

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
    // Fill Form For Edit
    // ==========================

    useEffect(() => {

        if (!editingTask) {

            return;

        }

        setTitle(editingTask.title);

        setDescription(editingTask.description || "");

        setDeadline(editingTask.deadline || "");

        setPriority(editingTask.priority);

        setStatus(editingTask.status);

        setSubjectId(editingTask.subject_id);

    }, [editingTask]);

    // ==========================
    // Submit
    // ==========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        const body = {

            title,

            description,

            deadline: deadline || null,

            priority,

            status,

            subject_id: Number(subjectId)

        };

        try {

            const token = localStorage.getItem("token");

            const config = {

                headers: {

                    Authorization: `Bearer ${token}`

                }

            };

            if (editingTask) {

                await api.patch(

                    `/tasks/${editingTask.id}`,

                    body,

                    config

                );

                toast.success("Task updated.");

            }

            else {

                await api.post(

                    "/tasks",

                    body,

                    config

                );

                toast.success("Task created.");

            }

            // Reset Form

            setTitle("");

            setDescription("");

            setDeadline("");

            setPriority("Medium");

            setStatus("Not Started");

            setSubjectId("");

            setEditingTask(null);

            loadTasks();

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

            className="task-form"

            onSubmit={handleSubmit}

        >

            <h2>

                {

                    editingTask

                        ? "Edit Task"

                        : "Create Task"

                }

            </h2>

            <input

                type="text"

                placeholder="Task Title"

                value={title}

                onChange={(e) =>

                    setTitle(e.target.value)

                }

                required

            />

            <textarea

                placeholder="Description"

                value={description}

                onChange={(e) =>

                    setDescription(e.target.value)

                }

            />

            <input

                type="date"

                value={deadline}

                onChange={(e) =>

                    setDeadline(e.target.value)

                }

            />

            <select

                value={priority}

                onChange={(e) =>

                    setPriority(e.target.value)

                }

            >

                <option>Low</option>

                <option>Medium</option>

                <option>High</option>

            </select>

            <select

                value={status}

                onChange={(e) =>

                    setStatus(e.target.value)

                }

            >

                <option>Not Started</option>

                <option>In Progress</option>

                <option>Completed</option>

            </select>

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

            <button type="submit">

                {

                    editingTask

                        ? "Update Task"

                        : "Create Task"

                }

            </button>

            {

                editingTask &&

                <button

                    type="button"

                    onClick={() => {

                        setEditingTask(null);

                        setTitle("");

                        setDescription("");

                        setDeadline("");

                        setPriority("Medium");

                        setStatus("Not Started");

                        setSubjectId("");

                    }}

                >

                    Cancel

                </button>

            }

        </form>

    );

}

export default TaskForm;