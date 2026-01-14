import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Addstudent.css";

const AddStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState({ regno: "", name: "", email: "", department: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => setStudent({ ...student, [e.target.name]: e.target.value });

  const validate = () => {
    if (!student.regno || !student.name || !student.email || !student.department) {
      setMessage("All fields are required.");
      setMessageType("error");
      return false;
    }

    if (student.regno <= 0) {
      setMessage("Reg No must be a positive number.");
      setMessageType("error");
      return false;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@(?:gmail\.com|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
    if (!emailRegex.test(student.email)) {
      setMessage("Please enter a valid email.");
      setMessageType("error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const res = await fetch("http://localhost:2000/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        setMessage("Student added successfully!");
        setMessageType("success");
        setStudent({ regno: "", name: "", email: "", department: "" });
        
      } else {
        const data = await res.json();
        setMessage(data.message || "Error adding student.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error.");
      setMessageType("error");
    }
  };

  return (
    <div className="add-student-wrapper">
      <div className="add-container">
        <form onSubmit={handleSubmit}>
          <h2>Add Student</h2>

          {message && <p className={`msg ${messageType}`}>{message}</p>}

          <label>Reg No</label>
          <input type="number" name="regno" value={student.regno} onChange={handleChange} />

          <label>Name</label>
          <input type="text" name="name" value={student.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={student.email} onChange={handleChange} />

          <label>Department</label>
          <input list="departments" name="department" value={student.department} onChange={handleChange} />
          <datalist id="departments">
            <option value="CSE" />
            <option value="ECE" />
            <option value="MECH" />
            <option value="EEE" />
            <option value="CIVIL" />
          </datalist>

          <div style={{ display: "flex", gap: "10px" }}>
            <button type="submit">Add Student</button>
            <button type="button" onClick={() => navigate("/")}>Dashboard</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;