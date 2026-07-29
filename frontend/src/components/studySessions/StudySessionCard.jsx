function StudySessionCard({

    session,

    onEdit,

    onDelete

}) {

    return (

        <div className="study-card">

            {/* ==========================
                Header
            ========================== */}

            <div className="study-card-header">

                <h3>

                    📚 Subject #{session.subject_id}

                </h3>

                <span className="study-duration">

                    {session.duration_minutes} mins

                </span>

            </div>

            {/* ==========================
                Body
            ========================== */}

            <div className="study-card-body">

                <p>

                    <strong>Started:</strong>{" "}

                    {

                        session.started_at

                            ?

                            new Date(

                                session.started_at

                            ).toLocaleString()

                            :

                            "Not Recorded"

                    }

                </p>

                <p>

                    <strong>Ended:</strong>{" "}

                    {

                        session.ended_at

                            ?

                            new Date(

                                session.ended_at

                            ).toLocaleString()

                            :

                            "Not Recorded"

                    }

                </p>

            </div>

            {/* ==========================
                Footer
            ========================== */}

            <div className="study-card-footer">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(session)}

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

export default StudySessionCard;