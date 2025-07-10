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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Enrolled Courses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : enrolledCourses.length === 0 ? (
        <p>You have not enrolled in any courses.</p>
      ) : (
        <div className="space-y-6">
          {enrolledCourses.map((course) => (
            <div
              key={course._id}
              className="border p-4 rounded shadow bg-white"
            >
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p>{course.description}</p>
              <p className="text-sm text-blue-600">Category: {course.category}</p>
              <p className="text-sm mt-1">Teacher: {course.teacher.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyEnrolledCourses;
