import "../common/DeleteModal.css";

function DeleteTaskModal({ task, onConfirm, onCancel }) {

    return (

        <div className="delete-overlay">

            <div className="delete-modal">

                <h2>Delete Task</h2>

                <p>

                    Are you sure you want to delete

                    <strong> "{task.title}" </strong>

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

export default DeleteTaskModal;