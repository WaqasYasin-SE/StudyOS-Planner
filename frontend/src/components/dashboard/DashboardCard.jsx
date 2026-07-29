function DashboardCard({

    title,

    value,

    icon

}) {

    return (

        <div className="dashboard-card">

            <div className="dashboard-card-icon">

                {icon}

            </div>

            <div className="dashboard-card-content">

                <h2>

                    {value}

                </h2>

                <p>

                    {title}

                </p>

            </div>

        </div>

    );

}

export default DashboardCard;