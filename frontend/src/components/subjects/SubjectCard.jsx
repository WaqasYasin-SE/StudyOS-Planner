function SubjectCard({

    subject,

    onEdit,

    onDelete

}) {

    return (

        <div className="subject-card">

            <h2>{subject.name}</h2>

            <p>

                <strong>Daily Target:</strong> {subject.daily_study_target} mins

            </p>

            <p>

                <strong>Priority:</strong> {subject.priority}

            </p>

            <p>

                <strong>Semester ID:</strong> {subject.semester_id}

            </p>

            <div className="subject-card-footer">

                <button

                    className="edit-btn"

                    onClick={() => onEdit(subject)}

                >

                    Edit

                </button>

                <button

                    className="delete-btn"

                    onClick={onDelete}

                >

                    Delete

                </button>

            </div>

        </div>

    );

}

export default SubjectCard;