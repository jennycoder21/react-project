// src/App.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import StudentDashboard from "./pages/Student/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/teacher",
    element: (
      <PrivateRoute requiredRole="teacher">
        <TeacherDashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/student",
    element: (
      <PrivateRoute requiredRole="student">
        <StudentDashboard />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
