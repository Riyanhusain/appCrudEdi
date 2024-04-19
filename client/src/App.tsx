import "bootstrap/dist/css/bootstrap.min.css"; // Impor file CSS Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js"; //
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";

import RegisterCandidate from "./pages/Candidate/RegisterCandidate";
import Register from "./components/Register";
import DataEntryProfilePage from "./pages/Candidate/DataEntryProfilePage";
import AdminPage from "./pages/Admin/AdminPage";
import ProtectedRoute from "./ProtectedRoute";
import Error403Page from "./pages/error/Error403Page";

// import { UserList } from "./pages/User/UserList";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route>
            <Route index element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="error" element={<Error403Page />} />

            <Route
              path="admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="registerCandidate"
              element={
                // <ProtectedRoute requiredRole="candidate">
                <DataEntryProfilePage />
                // </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
