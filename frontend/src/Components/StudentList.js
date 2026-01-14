import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentList.css";

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [branch, setBranch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
  }, [search, branch]);

  const fetchStudents = async () => {
    const url = new URL("http://localhost:2000/api/students");

    if (search) url.searchParams.append("search", search);
    if (branch) url.searchParams.append("branch", branch);

    try {
      const res = await fetch(url);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Failed to fetch students:", err);
    }
  };

  const handleDelete = async (regno) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`http://localhost:2000/api/students/${regno}`, {
        method: "DELETE",
      });

      if (res.ok) {
        fetchStudents(); 
      } else {
        console.error("Failed to delete student");
      }
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="studentlist-wrapper">
      <h1 className="studentlist-title">Student List</h1>

      <div className="studentlist-filter-box">
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <input
          type="text"
          list="branchList"
          value={branch}
          placeholder="Select Branch"
          onChange={(e) => setBranch(e.target.value)}
        />

        <datalist id="branchList">
          <option value="CSE" />
          <option value="ECE" />
          <option value="MECH" />
          <option value="EEE" />
          <option value="CIVIL" />
        </datalist>

        <button onClick={() => navigate("/add-student")}>
          Add Student
        </button>
      </div>

      {/* STUDENT TABLE */}
      <table className="student-table">
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Email</th>
            <th>Branch</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {students.map((s) => (
            <tr key={s.regno}> {/* use regno as unique key */}
              <td>{s.regno}</td>
              <td>{s.name}</td>
              <td>{s.email}</td>
              <td>{s.department}</td>
              <td>
                <button
                  className="edit"
                  onClick={() => navigate(`/edit-student/${s.regno}`)}
                >
                  Edit
                </button>

                <button
                  className="delete"
                  onClick={() => handleDelete(s.regno)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}

          {students.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No students found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}