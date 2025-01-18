import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Schemas from "./pages/Schemas";
import CreateSchema from "./pages/CreateSchema";
import AddMethods from "./pages/addMethods";
import CreateAPI from "./pages/CreateAPI";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>}/>
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/dashboard" element={<Projects/>}/>
          <Route path="/dashboard/project" element={<Projects/>}/>
          <Route path="/dashboard/schema/:project_id" element={<Schemas/>}/>
          <Route path="/dashboard/createSchema/:project_id" element={<CreateSchema/>}/>
          <Route path="/dashboard/APIDocs/:project_id" element={<CreateAPI/>}/>
          <Route path="/dashboard/addMethods/:project_id/:schema_id" element={<AddMethods/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
