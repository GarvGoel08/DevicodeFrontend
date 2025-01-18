import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar2";
import Footer from "../components/Footer";
import ProjectModal from "../components/ProjectModal";
import ProjectsList from "../components/ProjectsList";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}api/v1/getUserProducts`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.projects);
      });
  }, []);

  const handleCreateProject = () => {
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    fetch(`${backendURL}api/v1/createProject`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ project_name: projectName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects([...projects, data.project]);
          setShowModal(false);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="h-screen bg-auth-bg flex flex-col">
      <Navbar />
      <div className="bg-auth-bg flex-grow relative">
        <div className="flex flex-row justify-end items-center p-8 px-12">
          <button
            onClick={() => setShowModal(true)}
            className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 rounded-md"
          >
            Create Project
          </button>
        </div>
        <ProjectsList projects={projects} />
        {/* Absolute div for modal in center(MODAL with Project Name and Create Prijecy) */}
        <ProjectModal
          showModal={showModal}
          handleCreateProject={handleCreateProject}
          setShowModal={setShowModal}
          projectName={projectName}
          setProjectName={setProjectName}
        />
      </div>
      <Footer />
    </div>
  );
}
