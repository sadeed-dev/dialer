// hooks/usePendingLead.js
export default function usePendingLead() {
  const getPendingLead = () => {
    try {
      const raw = localStorage.getItem("pendingLead");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  const savePendingLead = (lead) => {
    localStorage.setItem("pendingLead", JSON.stringify(lead));
  };

  const clearPendingLead = () => {
    localStorage.removeItem("pendingLead");
  };

  return {
    pendingLead: getPendingLead(), // always fresh from LS
    savePendingLead,
    clearPendingLead,
  };
}
