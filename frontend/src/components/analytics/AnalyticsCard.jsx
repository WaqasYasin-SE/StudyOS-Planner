function AnalyticsCard({

    title,

    value,

    icon

}) {

    return (

        <div className="analytics-card">

            <div className="analytics-card-icon">

                {icon}

            </div>

            <div className="analytics-card-content">

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

export default AnalyticsCard;