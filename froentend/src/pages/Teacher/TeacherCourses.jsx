import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const TeacherCourses = () => {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const myCourses = res.data.filter(
          (course) => course.teacher._id === user.id
        );

        setCourses(myCourses);
      } catch (err) {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, user.id]);

  const handleDelete = async (courseId) => {
    const confirm = window.confirm("Are you sure you want to delete this course?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCourses((prev) => prev.filter((c) => c._id !== courseId));
    } catch (err) {
      alert("Failed to delete course");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">📚 My Courses</h2>
        <Link
          to="/teacher/create"
          className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2 rounded shadow hover:scale-105 transition-transform"
        >
          + Create Course
        </Link>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p className="text-gray-500 italic">You haven't created any courses yet.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white p-5 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {course.title}
              </h3>
              <p className="text-gray-600 mb-1">{course.description}</p>
              <p className="text-sm text-blue-500 mb-1">
                📁 Category: {course.category}
              </p>
              <p className="text-sm text-green-600 mb-2">
                👥 Enrolled: {course.enrolledStudents.length}
              </p>

              {course.enrolledStudents.length > 0 && (
                <div className="bg-gray-50 p-3 rounded mt-3">
                  <h4 className="font-medium text-gray-700 mb-1 text-sm">
                    Enrolled Students:
                  </h4>
                  <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                    {course.enrolledStudents.map((student) => (
                      <li key={student._id}>
                        {student.name} ({student.email})
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => handleDelete(course._id)}
                className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded shadow transition-all"
              >
                🗑️ Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeacherCourses;
