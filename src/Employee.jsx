import api from "./api/api";
import { useNavigate } from "react-router-dom";
import EmployeeLeave from "./Leave/EmployeeLeave";
import EmployeeAttendance from "./Attendance/Employeeattendance";

function Employee({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">

        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Employee Dashboard</h2>
          <button
            className="bg-red-500 hover:bg-red-600 active:scale-90 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-150"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-3">

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Name</span>
            <span className="text-sm text-gray-900 font-semibold">{user.name}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Email</span>
            <span className="text-sm text-gray-900">{user.email}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Employee ID</span>
            <span className="text-sm text-gray-900 font-mono">{user.employeeId}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Department</span>
            <span className="text-sm text-gray-900">{user.department}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Phone</span>
            <span className="text-sm text-gray-900">{user.phone}</span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">Status</span>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${user.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
              {user.status ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="flex justify-between py-2 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-500">City</span>
            <span className="text-sm text-gray-900">{user.address?.city}</span>
          </div>

          <div className="flex justify-between py-2">
            <span className="text-sm font-medium text-gray-500">State</span>
            <span className="text-sm text-gray-900">{user.address?.state}</span>
          </div>

        </div>
      </div>
      <EmployeeLeave />
      <EmployeeAttendance />
    </div>
    
  );
}

export default Employee;