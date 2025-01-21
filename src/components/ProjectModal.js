import React from "react";

export default function ProjectModal({ showModal, setShowModal, handleCreateProject,projectName, setProjectName }) {
  return (
    <div
      className={`absolute ${
        showModal ? "flex" : "hidden"
      } flex-col gap-2 top-1/2 sm:left-1/2 sm:w-auto w-[90%] sm:mx-0 mx-[5%] sm:-translate-x-1/2 p-8 bg-main-bg text-text-normal -translate-y-1/2 rounded-lg`}
    >
      <h1 className="text-3xl px-6 font-bold text-center mb-4">
        Create a new project
      </h1>
      <p className="text-lg">Project Name</p>
      <input
        type="text"
        className="w-full bg-auth-bg p-4 py-2 rounded-lg focus:outline-none focus:shadow-outline focus:border-theme-color-primary transition-all duration-300 ease-in-out border border-text-light"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <button onClick={handleCreateProject} className="bg-theme-color-secondary hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 rounded-md w-full mt-4">
        Submit
      </button>
      <button
        onClick={() => setShowModal(false)}
        className="border-theme-color-primary border hover:bg-theme-color-primary transition-all duration-300 ease-in-out text-text-normal py-1 px-4 rounded-md w-full mt-1"
      >
        Cancel
      </button>
    </div>
  );
}
