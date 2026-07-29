import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import api from "../api/api";

import TaskForm from "../components/tasks/TaskForm";
import TaskCard from "../components/tasks/TaskCard";
import DeleteTaskModal from "../components/tasks/DeleteTaskModal";

import "../style/Task.css";

function Tasks() {

    // ==========================
    // State
    // ==========================

    const [tasks, setTasks] = useState([]);

    const [loading, setLoading] = useState(true);

    const [editingTask, setEditingTask] = useState(null);

    const [deleteTask, setDeleteTask] = useState(null);

    // ==========================
    // Load Tasks
    // ==========================

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const token = localStorage.getItem("token");

            const response = await api.get(

                "/tasks",

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setTasks(response.data);

        }

        catch {

            toast.error("Unable to load tasks.");

        }

        finally {

            setLoading(false);

        }

    };

    // ==========================
    // Delete Task
    // ==========================

    const removeTask = async () => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(

                `/tasks/${deleteTask.id}`,

                {

                    headers: {

                        Authorization: `Bearer ${token}`

                    }

                }

            );

            setTasks(

                tasks.filter(

                    (task) =>

                        task.id !== deleteTask.id

                )

            );

            setDeleteTask(null);

            toast.success("Task deleted successfully.");

        }

        catch {

            toast.error("Unable to delete task.");

        }

    };

    // ==========================
    // Loading
    // ==========================

    if (loading) {

        return <h2>Loading Tasks...</h2>;

    }

    // ==========================
    // UI
    // ==========================

    return (

        <div className="tasks-page">

            <div className="tasks-header">

                <h1>Task Management</h1>

                <p>

                    Organize and manage your study tasks.

                </p>

            </div>

            <TaskForm

                editingTask={editingTask}

                setEditingTask={setEditingTask}

                loadTasks={loadTasks}

            />

            <div className="tasks-grid">

                {

                    tasks.length === 0 ?

                        (

                            <div className="empty-state">

                                <h2>

                                    No Tasks Found

                                </h2>

                                <p>

                                    Create your first task.

                                </p>

                            </div>

                        )

                        :

                        (

                            tasks.map((task) => (

                                <TaskCard

                                    key={task.id}

                                    task={task}

                                    onEdit={setEditingTask}

                                    onDelete={() =>

                                        setDeleteTask(task)

                                    }

                                />

                            ))

                        )

                }

            </div>

            {

                deleteTask &&

                (

                    <DeleteTaskModal

                        task={deleteTask}

                        onConfirm={removeTask}

                        onCancel={() =>

                            setDeleteTask(null)

                        }

                    />

                )

            }

        </div>

    );

}

export default Tasks;