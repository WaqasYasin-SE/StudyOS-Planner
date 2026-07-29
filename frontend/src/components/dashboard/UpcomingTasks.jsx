function UpcomingTasks({ tasks }) {

    return (

        <div className="dashboard-section">

            <div className="section-header">

                <h2>

                    📅 Upcoming Tasks

                </h2>

            </div>

            {

                tasks.length === 0 ?

                    (

                        <div className="empty-state">

                            <p>

                                No upcoming tasks.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="task-list">

                            {

                                tasks.map((task) => (

                                    <div

                                        key={task.id}

                                        className="task-item"

                                    >

                                        <div className="task-info">

                                            <h4>

                                                {task.title}

                                            </h4>

                                            <small>

                                                Deadline: {

                                                    task.deadline

                                                        ?

                                                        new Date(

                                                            task.deadline

                                                        ).toLocaleDateString()

                                                        :

                                                        "No Deadline"

                                                }

                                            </small>

                                        </div>

                                        <div className="task-status">

                                            <span className="status-badge">

                                                {task.status}

                                            </span>

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default UpcomingTasks;