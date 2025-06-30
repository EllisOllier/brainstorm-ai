"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, [router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 p-6">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user.email}!</h1>
      {/* Your dashboard content here */}
    </div>
  );
}
