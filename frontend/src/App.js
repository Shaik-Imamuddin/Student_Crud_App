import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StudentList from "./Components/StudentList";
import AddStudent from "./Components/Addstudent";
import EditStudent from "./Components/Editstudent";

function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<StudentList/>}/>
        <Route path="/add-student" element={<AddStudent/>}/>
        <Route path="/edit-student/:regno" element={<EditStudent/>}/>
      </Routes>
    </Router>
  );
}

export default App;