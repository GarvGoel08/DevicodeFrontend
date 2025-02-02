import React, { useEffect } from 'react'
import Navbar from '../components/Navbar2'
import Footer from '../components/Footer'
import { useNavigate, useParams } from 'react-router-dom';
import SchemaList from '../components/SchemaList';
import {Sparkles as AIIcon} from 'lucide-react'

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
        <div className='flex justify-center'>
          <button
          onClick={()=>router(`/dashboard/generateSchema/${project_id}`)}
          className='mb-8 px-4 py-2 text-lg flex gap-2 self-center font-semibold bg-green-700 text-slate-100 rounded-lg transition-all ease-in duration-100 hover:bg-green-800'>
          Generate Schema using AI <AIIcon className='text-lg text-slate-100'/>
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}
