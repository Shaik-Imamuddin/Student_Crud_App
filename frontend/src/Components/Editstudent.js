import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Addstudent.css";

const EditStudent = () => {
  const { regno } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({ regno: "", name: "", email: "", department: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  useEffect(() => {
    fetch(`http://localhost:2000/api/students/${regno}`)
      .then(res => res.json())
      .then(data => setStudent(data))
      .catch(err => console.error(err));
  }, [regno]);

  const handleChange = (e) => setStudent({ ...student, [e.target.name]: e.target.value });

  const validate = () => {
    if (!student.name || !student.email || !student.department) {
      setMessage("All fields are required.");
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
      const res = await fetch(`http://localhost:2000/api/students/${regno}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (res.ok) {
        setMessage("Student updated successfully!");
        setMessageType("success");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessage("Error updating student");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Server error");
      setMessageType("error");
    }
  };

  return (
    <div className="add-student-wrapper">
      <div className="add-container">
        <form onSubmit={handleSubmit}>
          <h2>Edit Student</h2>
          {message && <p className={`msg ${messageType}`}>{message}</p>}

          <label>Reg No</label>
          <input type="number" name="regno" value={student.regno} readOnly />

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

            <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;