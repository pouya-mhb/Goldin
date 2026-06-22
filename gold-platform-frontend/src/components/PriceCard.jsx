export default function PriceCard({
    title,
    value
}) {

    return (
        <div className="card">

            <h3>{title}</h3>

            <div className="card-value">
                {Number(value).toLocaleString()}
            </div>

            <span>تومان</span>

        </div>
    );
}