import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const AllEnrolledStudents = () => {
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
        setError("Failed to fetch enrolled students.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [token, user.id]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Enrolled Students in Your Courses</h2>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length === 0 ? (
        <p>You haven't created any courses yet.</p>
      ) : (
        <div className="space-y-8">
          {courses.map((course) => (
            <div key={course._id} className="border p-4 rounded shadow bg-white">
              <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2">{course.description}</p>

              {course.enrolledStudents.length === 0 ? (
                <p className="text-sm text-gray-500">No students enrolled.</p>
              ) : (
                <ul className="list-disc list-inside space-y-1">
                  {course.enrolledStudents.map((student) => (
                    <li key={student._id}>
                      <span className="font-medium">{student.name}</span> ({student.email})
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllEnrolledStudents;
