function TaskCard({

    task,

    onEdit,

    onDelete

}) {

    return (

        <div className="task-card">

            {/* ==========================
                Header
            ========================== */}

            <div className="task-card-header">

                <div>

                    <h2>

                        {task.title}

                    </h2>

                    <p>

                        {task.description || "No description provided."}

                    </p>

                </div>

            </div>

            <hr />

            {/* ==========================
                Body
            ========================== */}

            <div className="task-card-body">

                <p>

                    <strong>Deadline:</strong>{" "}

                    {

                        task.deadline

                            ?

                            task.deadline

                            :

                            "No Deadline"

                    }

                </p>

                <p>

                    <strong>Priority:</strong>

                    <span

                        className={`priority ${task.priority.toLowerCase()}`}

                    >

                        {task.priority}

                    </span>

                </p>

                <p>

                    <strong>Status:</strong>

                    <span

                        className={`status ${task.status.toLowerCase().replace(/\s/g, "-")}`}

                    >

                        {task.status}

                    </span>

                </p>

                <p>

                    <strong>Subject ID:</strong>{" "}

                    {task.subject_id}

                </p>

            </div>

            {/* ==========================
                Footer
            ========================== */}

            <div className="task-card-footer">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(task)}

                >

                    ✏ Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={onDelete}

                >

                    🗑 Delete

                </button>

            </div>

        </div>

    );

}

export default TaskCard;