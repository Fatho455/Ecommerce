// Shared account page utilities
// Each account page inlines its own render logic for simplicity,
// but shared helpers live here.

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return isNaN(d) ? dateStr : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function getStatusClass(status) {
  switch ((status || "").toLowerCase()) {
    case "processing": return "processing";
    case "completed": return "completed";
    case "failed": return "failed";
    default: return "processing";
  }
}