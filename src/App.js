import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Projects from "./pages/Projects";
import Schemas from "./pages/Schemas";
import CreateSchema from "./pages/CreateSchema";
import AddMethods from "./pages/addMethods";
import UpdateMethods from "./pages/UpdateMethods";
import CreateAPI from "./pages/CreateAPI";
import SchemaDocs from "./pages/SchemaDocs";
import SchemaGeneratePage from "./pages/SchemaGeneratePage";

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
          <Route path="/dashboard/updateMethods/:project_id/:schema_id" element={<UpdateMethods/>}/>
          <Route path="/dashboard/getDocs/:schema_id" element={<SchemaDocs/>}/>
          <Route path="/dashboard/generateSchema/:project_id" element={<SchemaGeneratePage/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
