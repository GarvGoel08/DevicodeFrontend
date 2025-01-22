import React, { useEffect } from 'react'
import Navbar from '../components/Navbar2'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import SchemaList from '../components/SchemaList';

export default function Schemas() {
  const router = useNavigate();
  const {project_id} = useParams();
  const [schemas, setSchemas] = React.useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/getUserSchemas?project_id=${project_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        setSchemas(data.schemas);
      } else {
        alert(data.message);
      }
    }).catch((err) => console.log(err))
  })
  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="bg-auth-bg flex-grow relative">
        <div className="flex flex-row flex-wrap gap-3 justify-end items-center p-8 px-12">
          <button
            onClick={() => router(`/dashboard/createSchema/${project_id}`)}
            className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 rounded-md"
          >
            Create a new Schema
          </button>
          <button
            onClick={() => router(`/dashboard/APIDocs/${project_id}`)}
            className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 rounded-md"
          >
            Get API Documentation
          </button>
        </div>
        <SchemaList projects={schemas} projectId={project_id} />
      </div>
      <Footer />
    </div>
  )
}
