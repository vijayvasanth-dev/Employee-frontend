import { useState, useRef, useEffect } from 'react';
import api from './api/api';
import { useNavigate } from 'react-router-dom';
import AdminLeave from "./Leave/AdminLeave";
import AdminAttendance from "./Attendance/AdminAttendance"

const Admin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    status: false,
    address: { city: '', state: '' },
    department: '',
  });

  const [formview, setFormview] = useState(false);
  const [submitted, setSubmitted] = useState([]);
  const [error, setError] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const selectedIdRef = useRef('');

  const emptyForm = {
    name: '',
    email: '',
    password: '',
    phone: '',
    status: false,
    address: { city: '', state: '' },
    department: '',
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get("/api/employees");
      setSubmitted(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const post = async () => {
    try {
      await api.post("/api/employees", formData);
      fetchUsers();
      setFormData(emptyForm);
      setFormview(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const update = async () => {
    try {
      const updatedData = {
        name: formData.name,
        phone: formData.phone,
        status: formData.status,
        department: formData.department,
        address: {
          city: formData.address.city,
          state: formData.address.state,
        },
      };
      await api.patch(`/api/employees/${selectedIdRef.current}`, updatedData);
      await fetchUsers();
      setFormData(emptyForm);
      setFormview(false);
      setIsEdit(false);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const edit = (data) => {
    setFormData({
      name: data.name || '',
      email: data.email || '',
      password: '',
      phone: data.phone || '',
      status: data.status || false,
      address: {
        city: data.address?.city || '',
        state: data.address?.state || '',
      },
      department: data.department || '',
    });
    selectedIdRef.current = data.employeeId;
    setIsEdit(true);
    setFormview(true);
  };

  const cancel = () => {
    setFormData(emptyForm);
    setIsEdit(false);
    setFormview(false);
  };

  const deletes = async (employeeId) => {
    if (window.confirm("Do you want to delete this employee?")) {
      try {
        await api.delete(`/api/employees/${employeeId}`);
        fetchUsers();
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/api/auth/logout");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-4xl font-bold'>Admin Dashboard</h1>
        <button className='bg-red-400 rounded text-white font-bold px-4 py-2' onClick={handleLogout}>
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {formview && (
        <div className='mt-1 flex p-4 flex-col border-2 rounded w-110 mx-auto bg-gray-900'>

          <label className='text-white font-semibold ms-3'>Name
            <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Name"
            />
          </label>

          <label className='text-white font-semibold ms-3 mt-2'>Email
            <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="Email"
              disabled={isEdit}
            />
          </label>

          {!isEdit && (
            <label className='text-white font-semibold ms-3 mt-2'>Password
              <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
                type="password" name="password" value={formData.password}
                onChange={handleChange} placeholder="Password"
              />
            </label>
          )}

          <label className='text-white font-semibold ms-3 mt-2'>Phone
            <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
              type="tel" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="Phone"
            />
          </label>

          <label className='text-white font-semibold ms-3 mt-2'>City
            <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
              type="text" value={formData.address?.city}
              onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, city: e.target.value } }))}
              placeholder="City"
            />
          </label>

          <label className='text-white font-semibold ms-3 mt-2'>State
            <input className='border-2 rounded mt-2 bg-white w-100 text-black block'
              type="text" value={formData.address?.state}
              onChange={(e) => setFormData(prev => ({ ...prev, address: { ...prev.address, state: e.target.value } }))}
              placeholder="State"
            />
          </label>

          <label className='text-white font-semibold ms-3 mt-2'>
            Status
            <input className='border-2 rounded mt-2 ms-4 bg-white'
              type="checkbox" name="status"
              checked={formData.status} onChange={handleChange}
            />
          </label>

          <label className='text-white font-semibold ms-3 mt-2'>Department
            <select className='border rounded mt-2 bg-white text-black w-100 block'
              name="department" value={formData.department} onChange={handleChange}>
              <option value="">Select one</option>
              <option value="IT">Team leader</option>
              <option value="Developer">Developer</option>
              <option value="QA">QA</option>
              <option value="Devops">Devops</option>
              <option value="Data Analyst">Data Analyst</option>
            </select>
          </label>

          <div className='flex gap-2 mt-4 justify-center'>
            <button
              onClick={isEdit ? update : post}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isEdit ? "Update" : "Add Employee"}
            </button>
            <button onClick={cancel} className="px-4 py-2 bg-red-500 text-white rounded">
              Cancel
            </button>
          </div>

        </div>
      )}

      {!formview && (
        <>
          <button onClick={() => setFormview(true)} className="px-4 py-2 mb-4 bg-blue-500 text-white rounded font-bold">
            Add Employee
          </button>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">S.NO.</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">NAME</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ID</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">EMAIL</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">PHONE</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">STATUS</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">DEPARTMENT</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ADDRESS</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {submitted.map((data, index) => (
                  <tr key={data._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{data.name}</td>
                    <td className="px-4 py-3">{data.employeeId}</td>
                    <td className="px-4 py-3">{data.email}</td>
                    <td className="px-4 py-3">{data.phone}</td>
                    <td className="px-4 py-3">{data.status ? "Active" : "Inactive"}</td>
                    <td className="px-4 py-3">{data.department}</td>
                    <td className="px-4 py-3">{data.address?.city}, {data.address?.state}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => deletes(data.employeeId)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                        <button onClick={() => edit(data)} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-900">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <AdminLeave />
      <AdminAttendance/>
    </div>
  );
};

export default Admin;