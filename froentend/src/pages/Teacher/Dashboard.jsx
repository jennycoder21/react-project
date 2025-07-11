import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6 flex flex-col items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-3xl text-center">
        <h1 className="text-3xl font-bold text-blue-800 mb-4">
          👩‍🏫 Welcome, Teacher!
        </h1>
        <p className="text-gray-600 mb-6">
          Manage your courses, monitor enrollments, and inspire students.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-center">
          <Link
            to="/teacher/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          >
            📚 View My Courses
          </Link>

          <Link
            to="/teacher/create"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition"
          >
            ➕ Create New Course
          </Link>

          <Link
            to="#"
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow transition col-span-1 sm:col-span-2"
          >
            👥 View Enrolled Students
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
