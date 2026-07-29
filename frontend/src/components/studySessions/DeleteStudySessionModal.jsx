import "../common/DeleteModal.css";
function DeleteStudySessionModal({

    session,

    onConfirm,

    onCancel

}) {

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <h2>Delete Study Session</h2>

                <p>

                    Delete study session of

                    <strong>

                        {" "}

                        {session.duration_minutes} minutes

                    </strong>

                    ?

                </p>

                <p className="warning">

                    This action cannot be undone.

                </p>

                <div className="delete-actions">

                    <button
                        className="cancel-btn"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                    <button
                        className="delete-btn"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteStudySessionModal;