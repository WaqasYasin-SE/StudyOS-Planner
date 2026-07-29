import "../common/DeleteModal.css";

function DeleteSubjectModal({ subject, onConfirm, onCancel }) {

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <h2>Delete Subject</h2>

                <p>

                    Are you sure you want to delete

                    <strong> "{subject.name}" </strong>

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

export default DeleteSubjectModal;