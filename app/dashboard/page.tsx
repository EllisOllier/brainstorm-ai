import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export default async function Dashboard() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  return (
    <div>
      <button className='bg-blue-500 text-white p-1 rounded-sm active:bg-blue-600 hover:bg-blue-400'>Create New Project</button>

      <div>
        <h2>List all projects here</h2>
        <p>Each project should take you to "/dashboard/projects/[projectId]"</p>
        <p>Populate the database for my user with random projects to test the loading</p>
        <p>Might have to add protection to projects and chat routes</p>
      </div>
    </div>
  )
}