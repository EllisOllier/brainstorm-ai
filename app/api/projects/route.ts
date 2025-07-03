import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
    try {
        // Declare expected body
        const body = await req.json();
        const { user_id, title, description } = body;

        const supabase = await createClient();

        const { data, error } = await supabase
            .from("projects")
            .insert({ user_id, title, description });

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
            });
        }

        return new Response(JSON.stringify({ project: data }), { status: 201 })
    } catch (error) {
        return new Response('Internal Server Error', { status: 500 })
    }
}
