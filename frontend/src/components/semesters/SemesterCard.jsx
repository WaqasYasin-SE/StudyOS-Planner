function SemesterCard({

    semester,

    onEdit,

    onDelete

}) {

    return (

        <div className="semester-card">

            <div className="semester-card-header">

                <h2>

                    {semester.name}

                </h2>

            </div>

            <div className="semester-card-body">

                <p>

                    <strong>ID:</strong> {semester.id}

                </p>

                <p>

                    <strong>Duration:</strong> {semester.duration_weeks} Weeks

                </p>

            </div>

            <div className="semester-card-footer">

                <button
                    className="edit-btn"
                    onClick={onEdit}
                >

                    ✏️ Edit

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

export default SemesterCard;