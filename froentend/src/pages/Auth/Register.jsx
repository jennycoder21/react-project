import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "student" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Register</h2>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="p-2 border" required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border" required />
        <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} className="p-2 border" required />
        <select name="role" value={form.role} onChange={handleChange} className="p-2 border">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">Register</button>
      </form>
      
    </div>
  );
};

export default Register;
