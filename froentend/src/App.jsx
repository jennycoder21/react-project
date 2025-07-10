import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import TeacherDashboard from "./pages/Teacher/Dashboard";
import TeacherCourses from "./pages/Teacher/TeacherCourses";
import CreateCourse from "./pages/Teacher/CreateCourse";
import StudentDashboard from "./pages/Student/Dashboard";
import MyEnrolledCourses from "./pages/Student/MyEnrolledCourses";
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
    path: "/teacher/courses",
    element: (
      <PrivateRoute requiredRole="teacher">
        <TeacherCourses />
      </PrivateRoute>
    ),
  },
  {
    path: "/teacher/create",
    element: (
      <PrivateRoute requiredRole="teacher">
        <CreateCourse />
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
  {
    path: "/student/enrolled",
    element: (
      <PrivateRoute requiredRole="student">
        <MyEnrolledCourses />
      </PrivateRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
