// app/dashboard/ProjectsList.tsx (client component)
'use client'

import { useState } from 'react'
import Link from 'next/link'

type Project = {
  id: string;
  title: string;
  description: string;
  created_at: string | Date;
  updated_at: string | Date;
};

type ProjectsListProps = {
  projects: Project[];
  userId: string;
};

export default function ProjectsList({ projects, userId }: ProjectsListProps) {
  const [projectList, setProjectList] = useState(projects);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  const createProject = async () => {
    // Can set loading here
    try {   
        const res = await fetch('/api/projects', {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({user_id: userId, title: title, description: description}),
        });

        if(!res.ok) throw new Error("Failed to create project");
    } catch (error){
        console.error(error);
    }
  }

  const deleteProject = async (id: string) => {
    try {
        const res = await fetch(`/api/projects/${id}`, {
            method: "DELETE",
        });
        
        if(!res.ok) throw new Error("Failed to delete project");
    } catch (error) {
        console.error("Error deleting project:", error);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject();
  }

  // Filtered projects based on search
  const filteredProjects = projectList.filter(project =>
    project.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-lg shadow-lg p-6 w-96 flex flex-col gap-4"
          >
            <label htmlFor="title" className="flex flex-col font-semibold">
              Title:
              <input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </label>
            <label htmlFor="description" className="flex flex-col font-semibold">
              Description:
              <input
                id="description"
                name="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-gray-300 rounded-md mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </label>
            <div className="flex justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Create
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="flex items-center gap-4 mt-4 mb-6">
        <input
          type="text"
          placeholder="Search projects by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-300 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-500 text-white p-2 rounded-md active:bg-blue-600 hover:bg-blue-400"
        >
          Create New Project
        </button>
      </div>

      <div className="mt-6">
        {filteredProjects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {filteredProjects.map((project) => (
              <li key={project.id} className="mb-4 p-4 border rounded-lg shadow-sm bg-white">
                <h2 className="font-bold text-lg">{project.title}</h2>
                <p className="text-gray-700">{project.description}</p>
                <p className="text-xs text-gray-400">
                  Created at: {new Date(project.created_at).toISOString()}
                </p>
                <p className="text-xs text-gray-400">
                  Last updated: {new Date(project.updated_at).toISOString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <Link
                    className="bg-blue-500 text-white rounded-md px-3 py-1 active:bg-blue-600 hover:bg-blue-400"
                    href={`/dashboard/projects/${project.id}`}
                  >
                    Go to Project
                  </Link>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="bg-red-500 text-white rounded-md px-3 py-1 active:bg-red-600 hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
