import { useState, useEffect } from "react";
import api from "../api/api";

function Adminattendance() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    api.get("/api/attendance")
      .then(res => setRecords(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Attendance Records</h2>

      {records.length === 0 ? (
        <p className="text-gray-500">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="px-4 py-3 text-left text-gray-700">Employee</th>
                <th className="px-4 py-3 text-left text-gray-700">ID</th>
                <th className="px-4 py-3 text-left text-gray-700">Department</th>
                <th className="px-4 py-3 text-left text-gray-700">Date</th>
                <th className="px-4 py-3 text-left text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record._id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-3">{record.employeeId?.name}</td>
                  <td className="px-4 py-3">{record.employeeId?.employeeId}</td>
                  <td className="px-4 py-3">{record.employeeId?.department}</td>
                  <td className="px-4 py-3">{record.date}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full
                      ${record.status === "present" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                      {record.status.toUpperCase()}
                    </span>
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

export default Adminattendance;