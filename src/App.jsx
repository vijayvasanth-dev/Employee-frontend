import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './auth/Login';
import Profile from './auth/Profile';
import PrivateRoute from './auth/PrivateRoute';
import PublicRoute from './auth/PublicRoute';
import { Navigate } from "react-router-dom";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        } />

      </Routes>

    </Router>
  );
}

export default App;