function ProgressCard({ dashboard }) {

    return (

        <div className="progress-card">

            {/* ==========================
                Header
            ========================== */}

            <div className="progress-header">

                <h2>

                    Study Progress

                </h2>

                <span className="progress-percent">

                    {dashboard.completed_percentage}%

                </span>

            </div>

            {/* ==========================
                Progress Bar
            ========================== */}

            <div className="progress-bar">

                <div

                    className="progress-fill"

                    style={{

                        width: `${dashboard.completed_percentage}%`

                    }}

                ></div>

            </div>

            {/* ==========================
                Statistics
            ========================== */}

            <div className="progress-grid">

                <div className="progress-item">

                    <h3>

                        {dashboard.completed_tasks}

                    </h3>

                    <p>

                        Completed

                    </p>

                </div>

                <div className="progress-item">

                    <h3>

                        {dashboard.in_progress_tasks}

                    </h3>

                    <p>

                        In Progress

                    </p>

                </div>

                <div className="progress-item">

                    <h3>

                        {dashboard.pending_tasks}

                    </h3>

                    <p>

                        Pending

                    </p>

                </div>

                <div className="progress-item">

                    <h3>

                        {dashboard.overdue_tasks}

                    </h3>

                    <p>

                        Overdue

                    </p>

                </div>

            </div>

            {/* ==========================
                Motivation
            ========================== */}

            <div className="motivation-box">

                <h3>

                    Motivation

                </h3>

                <p>

                    {dashboard.motivation}

                </p>

            </div>

        </div>

    );

}

export default ProgressCard;