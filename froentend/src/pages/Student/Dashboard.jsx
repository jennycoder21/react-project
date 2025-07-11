import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const [enrolling, setEnrolling] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        setError("Failed to load courses");
      }
    };

    fetchCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    try {
      await axios.post(
        `http://localhost:5000/api/courses/${courseId}/enroll`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setCourses((prev) =>
        prev.map((course) =>
          course._id === courseId
            ? {
                ...course,
                enrolledStudents: [...course.enrolledStudents, { _id: user.id }],
              }
            : course
        )
      );
    } catch (err) {
      alert(err.response?.data?.message || "Enrollment failed");
    } finally {
      setEnrolling(null);
    }
  };

  const filteredCourses = filter
    ? courses.filter((c) =>
        c.category.toLowerCase().includes(filter.toLowerCase())
      )
    : courses;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          🎓 All Available Courses
        </h2>
        <button
          onClick={() => navigate("/student/enrolled")}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded shadow transition-transform hover:scale-105"
        >
          My Enrolled Courses
        </button>
      </div>

      <input
        type="text"
        placeholder="🔍 Search by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm mb-6 focus:outline-none focus:ring focus:border-blue-300"
      />

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCourses.length === 0 ? (
        <p className="text-gray-600 italic">No courses found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => {
            const alreadyEnrolled = course.enrolledStudents.some(
              (s) => s._id === user.id
            );

            return (
              <div
                key={course._id}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-700 mb-2">{course.description}</p>
                  <p className="text-sm text-blue-600">
                    📁 Category: {course.category}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    👨‍🏫 Teacher: <strong>{course.teacher.name}</strong>
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    👥 Enrolled: {course.enrolledStudents.length}
                  </p>
                </div>

                {alreadyEnrolled ? (
                  <p className="mt-4 text-green-700 font-semibold text-center">
                    ✅ Already Enrolled
                  </p>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-transform hover:scale-105"
                    disabled={enrolling === course._id}
                  >
                    {enrolling === course._id ? "Enrolling..." : "Enroll"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
