import "./DashboardCard.css";

function DashboardCard({
  title,
  value,
  icon,
  color,
  change,
}) {
  return (
    <div className="dashboard-card">

      <div
        className="card-top"
      >
        <div
          className="card-icon"
          style={{ background: color }}
        >
          {icon}
        </div>

        <span className="growth">
          {change}
        </span>
      </div>

      <h2>{value}</h2>

      <p>{title}</p>

    </div>
  );
}

export default DashboardCard;