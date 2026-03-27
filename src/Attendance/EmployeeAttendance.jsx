import { useState, useEffect } from "react";
import api from "../api/api";

function Employeeattendance() {
  const [records, setRecords] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchAttendance = async () => {
    try {
      const res = await api.get("/api/attendance/my");
      setRecords(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const markAttendance = async (status) => {
    try {
      await api.post("/api/attendance", { status });
      setMessage(`Marked as ${status} for today`);
      setError("");
      fetchAttendance();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      setMessage("");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Attendance</h2>

      {message && <p className="text-green-600 mb-2">{message}</p>}
      {error && <p className="text-red-500 mb-2">{error}</p>}

      <div className="flex gap-3 mb-6">
        <button
          onClick={() => markAttendance("present")}
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
        >
          Mark Present
        </button>
        <button
          onClick={() => markAttendance("absent")}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
        >
          Mark Absent
        </button>
      </div>

      <h3 className="text-xl font-bold mb-3">My Attendance History</h3>

      {records.length === 0 ? (
        <p className="text-gray-500">No attendance records found.</p>
      ) : (
        <div className="flex flex-col gap-2">
          {records.map(record => (
            <div key={record._id} className="flex justify-between items-center bg-white rounded-xl shadow px-4 py-3">
              <span className="text-gray-700">{record.date}</span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full
                ${record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                {record.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Employeeattendance;