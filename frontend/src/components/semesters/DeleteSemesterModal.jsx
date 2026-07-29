function DeleteSemesterModal({

    semester,

    onConfirm,

    onCancel

}) {

    return (

        <div className="modal-overlay">

            <div className="delete-modal">

                <h2>

                    Delete Semester

                </h2>

                <p>

                    Are you sure you want to delete

                    <strong> {semester.name}</strong>?

                </p>

                <p>

                    This action cannot be undone.

                </p>

                <div className="modal-buttons">

                    <button

                        className="delete-btn"

                        onClick={onConfirm}

                    >

                        Delete

                    </button>

                    <button

                        className="cancel-btn"

                        onClick={onCancel}

                    >

                        Cancel

                    </button>

                </div>

            </div>

        </div>

    );

}

export default DeleteSemesterModal;