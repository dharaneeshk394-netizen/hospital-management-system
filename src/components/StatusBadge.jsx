function StatusBadge({ status }) {
  const normalizedStatus = status?.toLowerCase();

  let className = "status-badge";

  if (normalizedStatus === "active") {
    className += " status-active";
  }

  if (normalizedStatus === "inactive") {
    className += " status-inactive";
  }

  if (normalizedStatus === "scheduled") {
    className += " status-scheduled";
  }

  if (normalizedStatus === "completed") {
    className += " status-completed";
  }

  if (normalizedStatus === "cancelled") {
    className += " status-cancelled";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}

export default StatusBadge;