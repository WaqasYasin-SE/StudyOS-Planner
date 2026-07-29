function ProgressSummary({

    tasks,

    sessions

}) {

    const completedTasks = tasks.filter(

        task => task.status === "Completed"

    ).length;

    const totalMinutes = sessions.reduce(

        (sum, session) => sum + session.duration_minutes,

        0

    );

    const totalHours = (totalMinutes / 60).toFixed(1);

    const completionRate =

        tasks.length === 0

            ? 0

            : Math.round(

                (completedTasks / tasks.length) * 100

            );

    let message = "Let's start your learning journey!";

    if (completionRate >= 80) {

        message = "🔥 Excellent! You're making amazing progress.";

    }

    else if (completionRate >= 50) {

        message = "🚀 Great work! Keep the momentum going.";

    }

    else if (completionRate > 0) {

        message = "💪 You're improving. Stay consistent.";

    }

    return (

        <div className="progress-summary">

            <h2>

                Progress Summary

            </h2>

            <div className="summary-grid">

                <div className="summary-item">

                    <h3>

                        {tasks.length}

                    </h3>

                    <p>Total Tasks</p>

                </div>

                <div className="summary-item">

                    <h3>

                        {completedTasks}

                    </h3>

                    <p>Completed Tasks</p>

                </div>

                <div className="summary-item">

                    <h3>

                        {sessions.length}

                    </h3>

                    <p>Study Sessions</p>

                </div>

                <div className="summary-item">

                    <h3>

                        {totalHours}

                    </h3>

                    <p>Study Hours</p>

                </div>

            </div>

            <div className="summary-message">

                <h3>

                    {completionRate}% Completed

                </h3>

                <p>

                    {message}

                </p>

            </div>

        </div>

    );

}

export default ProgressSummary;