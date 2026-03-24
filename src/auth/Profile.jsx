import { useEffect, useState } from "react";
import api from '../api/api';
import Admin from "../Admin";
import Employee from "../Employee";

function Profile() {

  const [user, setUser] = useState(null);

  useEffect(() => {

    api.get("/api/profile")
      .then(res => setUser(res.data))
      .catch(() => alert("Unauthorized"));
  }, []);


  if (!user) return <div>Loading...</div>;

  return (
    <div>
      {user.role === "admin" && <Admin />}
      {user.role === "employee" && <Employee user={user} />}
    </div>
  );
}

export default Profile;