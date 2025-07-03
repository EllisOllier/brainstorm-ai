import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Link from 'next/link';

export default async function Dashboard() {
  const supabase = await createClient()

  // Get logged-in user data  
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    console.log("user not logged in");
    redirect('/login');
    return null;
  }

  console.log("Current logged in user ID: ", data.user.id);

  // Get all projects for a user
  const { data: projects, error: projectsError } = await supabase
    .from('projects')
    .select('id, title, description, created_at, updated_at')
    .eq('user_id', data.user.id);

  if (projectsError) {
    return <p>Error loading projects: {projectsError.message}</p>
  }

  return (
    <div>
      <button className='bg-blue-500 text-white p-1 rounded-sm active:bg-blue-600 hover:bg-blue-400'>
        Create New Project
      </button>

      <div>
        {projects?.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <ul>
            {projects.map(project => (
              <li key={project.id} className="mb-4">
                <h2 className="font-bold">{project.title}</h2>
                <p>{project.description}</p>
                <p>Created at: {new Date(project.created_at).toLocaleString()}</p>
                <p>Last updated: {new Date(project.updated_at).toLocaleString()}</p>
                <Link className='bg-blue-500 text-white rounded-md p-1 active:bg-blue-600 hover:bg-blue-400' href={`/dashboard/projects/${project.id}`}>Go to Project</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
