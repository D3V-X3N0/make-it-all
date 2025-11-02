import { Routes, Route, Navigate} from "react-router-dom";
import { useState } from "react";
import Topbar from "./components/topbar";
import Sidebar from "./components/sidebar";
import Dashboard from "./pages/dashboard";
import ManageTasks from "./pages/manageTasks";
import ManageProjects from "./pages/manageProjects";
import ProjectDetails from "./pages/projectDetails";
import Profile from "./pages/profile";
import Topics from "./pages/topics";
import Login from "./pages/loginPage";
import Register from "./pages/registrationPage";
import EmployeeHome from "./pages/employeeHome";
import EmployeeTasks from "./pages/employeeTasks";
import EmployeeChat from "./pages/employeeChat";
import Iridescence from './components/iridescence';
import "./index.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  const PrivateRoute = ({ children }) => {
    return isAuthenticated ? (
      <>
        <Sidebar />
        <main className="content">
          <Topbar />
          {children}
        </main>
      </>
    ) : (
      <Navigate to="/login" />
    );
  };

  return (
    
<div className="app">
      <Iridescence
        color={[0, 0.05, 0.15]}
        mouseReact={false}
        amplitude={0.1}
        speed={0.1}
      />
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/login" element={<Login setAuth={setIsAuthenticated} />} />
        <Route path="/register" element={<Register />} />

        {/* Manager Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-tasks"
          element={
            <PrivateRoute>
              <ManageTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/manage-projects"
          element={
            <PrivateRoute>
              <ManageProjects />
            </PrivateRoute>
          }
        />

        <Route
          path="/project-details/:id"
          element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/topics"
          element={
            <PrivateRoute>
              <Topics />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* Employee Routes */}
        <Route
          path="/employee-home"
          element={
            <PrivateRoute>
              <EmployeeHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-tasks"
          element={
            <PrivateRoute>
              <EmployeeTasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/employee-chat"
          element={
            <PrivateRoute>
              <EmployeeChat />
            </PrivateRoute>
          }
        />
      
        <Route
          path="/employee-topics"
          element={
            <PrivateRoute>
              <Topics />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
      
  );
}

export default App;
