function TaskStatusChart({

    completed,

    pending

}) {

    const total = completed + pending;

    const percentage =

        total === 0

            ? 0

            : Math.round((completed / total) * 100);

    return (

        <div className="analytics-box">

            <div className="analytics-box-header">

                <h2>Task Progress</h2>

                <span>

                    {percentage}%

                </span>

            </div>

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width: `${percentage}%`

                    }}

                />

            </div>

            <div className="task-summary">

                <div className="task-item">

                    <span className="task-dot completed-dot"></span>

                    <span>

                        Completed

                    </span>

                    <strong>

                        {completed}

                    </strong>

                </div>

                <div className="task-item">

                    <span className="task-dot pending-dot"></span>

                    <span>

                        Pending

                    </span>

                    <strong>

                        {pending}

                    </strong>

                </div>

                <div className="task-item">

                    <span className="task-dot total-dot"></span>

                    <span>

                        Total

                    </span>

                    <strong>

                        {total}

                    </strong>

                </div>

            </div>

        </div>

    );

}

export default TaskStatusChart;