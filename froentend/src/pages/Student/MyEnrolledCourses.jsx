import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const MyEnrolledCourses = () => {
  const { user, token } = useAuth();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myCourses = res.data.filter((course) =>
          course.enrolledStudents.some((student) => student._id === user.id)
        );

        setEnrolledCourses(myCourses);
      } catch (err) {
        setError("Failed to fetch enrolled courses.");
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [token, user.id]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        📘 My Enrolled Courses
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : enrolledCourses.length === 0 ? (
        <p className="text-gray-600 italic">
          You have not enrolled in any courses.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="bg-white border border-gray-200 p-5 rounded-lg shadow hover:shadow-lg transition"
            >
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
