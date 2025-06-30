"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Listen for auth changes (login/logout)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription.unsubscribe();
  }, []);

  // Email/password login
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setUser(data.user);
    }

    setLoading(false);
  };

  // OAuth login
  const handleOAuthLogin = async (provider: "github" | "google") => {
    setError("");
    const { error } = await supabase.auth.signInWithOAuth({ provider });
    if (error) setError(error.message);
    // Note: This will redirect user to provider's login page
  };

  // Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  if (user) {
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center">
        <p className="mb-4">Logged in as {user.email}</p>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Login to Brainstorm AI</h1>

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>

      <div className="my-6 text-center">OR</div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => handleOAuthLogin("github")}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Continue with GitHub
        </button>
        <button
          onClick={() => handleOAuthLogin("google")}
          className="flex items-center justify-center gap-2 px-4 py-2 border rounded hover:bg-gray-100"
        >
          Continue with Google
        </button>
      </div>

      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
