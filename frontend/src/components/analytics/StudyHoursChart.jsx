function StudyHoursChart({ sessions }) {

    const totalMinutes = sessions.reduce(

        (sum, session) => sum + session.duration_minutes,

        0

    );

    const totalHours = (totalMinutes / 60).toFixed(1);

    return (

        <div className="analytics-box">

            <div className="analytics-box-header">

                <h2>Study Hours</h2>

                <span>{totalHours} hrs</span>

            </div>

            {

                sessions.length === 0 ?

                    (

                        <div className="empty-card">

                            <h3>No Study Sessions</h3>

                            <p>

                                Complete a study session to view analytics.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="study-session-list">

                            {

                                sessions

                                    .slice(-5)

                                    .reverse()

                                    .map((session) => (

                                        <div

                                            key={session.id}

                                            className="study-session-row"

                                        >

                                            <div>

                                                <strong>

                                                    Subject #{session.subject_id}

                                                </strong>

                                                <br />

                                                <small>

                                                    {

                                                        session.started_at

                                                            ?

                                                            new Date(

                                                                session.started_at

                                                            ).toLocaleDateString()

                                                            :

                                                            "No Date"

                                                    }

                                                </small>

                                            </div>

                                            <span>

                                                {session.duration_minutes} min

                                            </span>

                                        </div>

                                    ))

                            }

                        </div>

                    )

            }

        </div>

    );

}

export default StudyHoursChart;