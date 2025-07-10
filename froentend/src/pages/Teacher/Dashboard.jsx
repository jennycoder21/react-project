import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome Teacher</h1>

      <Link
        to="/teacher/courses"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        View My Courses
      </Link>
    </div>
  );
};

export default TeacherDashboard;
