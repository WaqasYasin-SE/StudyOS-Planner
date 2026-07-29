function RecentSessions({ sessions }) {

    return (

        <div className="dashboard-section">

            <div className="section-header">

                <h2>

                    ⏱ Recent Study Sessions

                </h2>

            </div>

            {

                sessions.length === 0 ?

                    (

                        <div className="empty-state">

                            <p>

                                No study sessions found.

                            </p>

                        </div>

                    )

                    :

                    (

                        <div className="session-list">

                            {

                                sessions.map((session) => (

                                    <div

                                        key={session.id}

                                        className="session-item"

                                    >

                                        <div className="session-info">

                                            <h4>

                                                Subject #{session.subject_id}

                                            </h4>

                                            <small>

                                                {

                                                    session.started_at

                                                        ?

                                                        new Date(

                                                            session.started_at

                                                        ).toLocaleString()

                                                        :

                                                        "No Start Time"

                                                }

                                            </small>

                                        </div>

                                        <div className="session-duration">

                                            <strong>

                                                {session.duration_minutes} min

                                            </strong>

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

export default RecentSessions;