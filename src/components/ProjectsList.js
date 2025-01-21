import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

export default function ProjectsList({projects}) {
  const [projectList,setProjectList] = useState([]);
  const handleDeleteProject = (projectId) => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;

    fetch(`${backendURL}api/v1/deleteProject/${projectId}`, {
      method: "DELETE",
      credentials: "include",
    })
    .then(res=>{
      return res.json();
    })
    .then(data=>{
      setProjectList((prevProjects) =>(
        prevProjects.filter((project) => project._id !== projectId)
      )
      );
      alert("Project Deleted Successfully")
    })
    .catch(err=>{
      alert("Something went wrong in deleting the project")
    })


  }

  useEffect(() => {
    if (projects) {
      setProjectList(projects);
    }
  }, [projects]);

  const router = useNavigate();
  return (
    <div className="px-8 mb-8 flex flex-col gap-3">
      {projectList &&
        projectList.length > 0 &&
        projectList?.map((project, index) => (
          <div
            key={index}
            onClick={() => router(`/dashboard/schema/${project._id}`)}
            className="bg-black bg-opacity-10 flex-wrap text-text-normal flex sm:gap-0 gap-2 flex-col sm:flex-row justify-between sm:items-center p-8 py-4 border border-border-light rounded-lg transition-all duration-300 ease-in-out hover:border-theme-color-primary cursor-pointer"
          >
            <h1 className="text-xl font-bold">{project.project_name}</h1>
            <div className='flex flex-col sm:flex-row sm:gap-4 gap-2'> 
              <button className="bg-delete-color text-text-normal text-sm px-2 py-1 rounded-md"
              onClick={(e)=>{
                  e.stopPropagation();
                  handleDeleteProject(project._id)
                }
              }
              >
                Delete Project
              </button>
              <p className="text-base">{new Date(project.createdAt).toDateString() + " / " + new Date(project.createdAt).toLocaleTimeString()}</p>
            </div>
          </div>
        ))}
    </div>
  )
}
