import { useState, useEffect } from "react";
import api from "../api/api";



function AdminLeave() {
  const [leaves, setLeaves] = useState([]);
  const [remark, setRemark] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const fetchLeaves = async () => {
    try {
      const res = await api.get("/api/leaves");
      setLeaves(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleAction = async (id, status) => {
    try {
      await api.patch(`/api/leaves/${id}`, {
        status,
        adminRemark: remark,
      });
      setRemark("");
      setSelectedId(null);
      fetchLeaves();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Leave Requests</h2>

      {leaves.length === 0 ? (
        <p className="text-gray-500">No leave requests found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700">Employee</th>
                <th className="px-4 py-3 text-left text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-gray-700">From</th>
                <th className="px-4 py-3 text-left text-gray-700">To</th>
                <th className="px-4 py-3 text-left text-gray-700">Reason</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
                <th className="px-4 py-3 text-left text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{leave.employeeId?.name}</td>
                  <td className="px-4 py-3">{leave.employeeId?.department}</td>
                  <td className="px-4 py-3">{new Date(leave.startDate).toDateString()}</td>
                  <td className="px-4 py-3">{new Date(leave.endDate).toDateString()}</td>
                  <td className="px-4 py-3">{leave.reason}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full
                      ${leave.status === "approved" ? "bg-green-100 text-green-700" :
                        leave.status === "rejected" ? "bg-red-100 text-red-600" :
                        "bg-yellow-100 text-yellow-700"}`}>
                      {leave.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {leave.status === "pending" && (
                      <div className="flex flex-col gap-2">
                        {selectedId === leave._id && (
                          <input
                            type="text"
                            placeholder="Add remark (optional)"
                            className="border rounded px-2 py-1 text-sm"
                            value={remark}
                            onChange={e => setRemark(e.target.value)}
                          />
                        )}
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedId(leave._id);
                              handleAction(leave._id, "approved");
                            }}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => {
                              setSelectedId(leave._id);
                              handleAction(leave._id, "rejected");
                            }}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    )}
                    {leave.status !== "pending" && (
                      <span className="text-sm text-gray-500">{leave.adminRemark || "—"}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminLeave;