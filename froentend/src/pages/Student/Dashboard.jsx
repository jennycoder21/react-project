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
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">All Available Courses</h2>
        <button
          onClick={() => navigate("/student/enrolled")}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          My Enrolled Courses
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded w-full max-w-md mb-6"
      />

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredCourses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="grid gap-6">
          {filteredCourses.map((course) => {
            const alreadyEnrolled = course.enrolledStudents.some(
              (s) => s._id === user.id
            );

            return (
              <div
                key={course._id}
                className="border p-4 rounded shadow bg-white"
              >
                <h3 className="text-lg font-semibold">{course.title}</h3>
                <p>{course.description}</p>
                <p className="text-sm text-blue-600">
                  Category: {course.category}
                </p>
                <p className="text-sm mt-1">
                  Teacher: <strong>{course.teacher.name}</strong>
                </p>
                <p className="text-sm text-green-600 mt-1">
                  Enrolled: {course.enrolledStudents.length}
                </p>

                {alreadyEnrolled ? (
                  <p className="mt-2 text-green-700 font-semibold">
                    ✅ Already Enrolled
                  </p>
                ) : (
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
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
