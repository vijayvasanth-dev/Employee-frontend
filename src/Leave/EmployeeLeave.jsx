import { useState, useEffect } from "react";
import api from "../api/api";

function EmployeeLeave() {
  const [leaves, setLeaves] = useState([]);
  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [error, setError] = useState("");

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/api/leaves/my");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApply = async () => {
    try {
      await api.post("/api/leaves", formData);
      setFormData({ startDate: "", endDate: "", reason: "" });
      fetchLeaves();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Apply for Leave</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-3 mb-6">
        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Start Date
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={formData.startDate}
            onChange={e => setFormData({ ...formData, startDate: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          End Date
          <input
            type="date"
            className="border rounded-lg px-3 py-2"
            value={formData.endDate}
            onChange={e => setFormData({ ...formData, endDate: e.target.value })}
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-gray-700">
          Reason
          <textarea
            className="border rounded-lg px-3 py-2"
            rows={3}
            value={formData.reason}
            onChange={e => setFormData({ ...formData, reason: e.target.value })}
            placeholder="Enter reason"
          />
        </label>

        <button
          onClick={handleApply}
          className="bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700"
        >
          Apply Leave
        </button>
      </div>

      <h2 className="text-2xl font-bold mb-4">My Leave Requests</h2>

      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {leaves.map(leave => (
            <div key={leave._id} className="bg-white rounded-xl shadow p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">{leave.reason}</span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full 
                  ${leave.status === "approved" ? "bg-green-100 text-green-700" :
                    leave.status === "rejected" ? "bg-red-100 text-red-600" :
                    "bg-yellow-100 text-yellow-700"}`}>
                  {leave.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(leave.startDate).toDateString()} → {new Date(leave.endDate).toDateString()}
              </p>
              {leave.adminRemark && (
                <p className="text-sm text-gray-600 mt-1">Remark: {leave.adminRemark}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeLeave;