import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import Dashboard from "./pages/DashBoard";
import Patients from "./pages/Patients";
import Doctors from "./pages/Doctors";
import Appointments from "./pages/Appointments";
import Billing from "./pages/Billing";
import Login from "./pages/Login";

function App() {
  const token =
    localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/" />
            ) : (
              <Login />
            )
          }
        />

        {/* DASHBOARD */}

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* PATIENTS */}

        <Route
          path="/patients"
          element={
            <ProtectedRoute>
              <Patients />
            </ProtectedRoute>
          }
        />

        {/* DOCTORS */}

        <Route
          path="/doctors"
          element={
            <ProtectedRoute>
              <Doctors />
            </ProtectedRoute>
          }
        />

        {/* APPOINTMENTS */}

        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <Appointments />
            </ProtectedRoute>
          }
        />

        {/* BILLING */}

        <Route
          path="/billing"
          element={
            <ProtectedRoute>
              <Billing />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
