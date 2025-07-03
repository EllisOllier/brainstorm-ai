import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import ProjectsList from "@/component/ProjectList";

export default async function Dashboard() {
    const supabase = await createClient();

    // Get logged-in user data
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user) {
        console.log("user not logged in");
        redirect("/login");
        return null;
    }

    console.log("Current logged in user ID: ", data.user.id);

    // Get all projects for a user
    const { data: projects, error: projectsError } = await supabase
        .from("projects")
        .select("id, title, description, created_at, updated_at")
        .eq("user_id", data.user.id);

    if (projectsError) {
        return <p>Error loading projects: {projectsError.message}</p>;
    }

    return (
        <div>
            <div>
                <ProjectsList projects={projects || []} userId={data.user.id} />
            </div>
        </div>
    );
}
