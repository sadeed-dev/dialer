const LeadStatusColor = (status) => {
  const map = {
    "Interested": {
      bg: "#dcfce7", // light green
      color: "#15803d", // dark green
      border: "1px solid #86efac",
    },
    "Not picking up": {
      bg: "#fef9c3",
      color: "#92400e",
      border: "1px solid #fde68a",
    },
    "Busy": {
      bg: "#e0f2fe",
      color: "#1d4ed8",
      border: "1px solid #93c5fd",
    },
    "Wrong number": {
      bg: "#fee2e2",
      color: "#b91c1c",
      border: "1px solid #fecaca",
    },
    "Callback": {
      bg: "#ede9fe",
      color: "#6b21a8",
      border: "1px solid #ddd6fe",
    },
    "Language Issue": {
      bg: "#f3f4f6",
      color: "#4b5563",
      border: "1px solid #e5e7eb",
    },
    "Not Interested": {
      bg: "#fef2f2",
      color: "#991b1b",
      border: "1px solid #fecaca",
    },
  };

  return map[status] || {
    bg: "#f3f4f6",
    color: "#4b5563",
    border: "1px solid #d1d5db",
  };
};

export default LeadStatusColor