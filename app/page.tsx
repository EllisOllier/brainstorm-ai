"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function Home() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    const { data: existing, error: fetchError } = await supabase
      .from('waitlist')
      .select('email')
      .eq('email', email)
      .limit(1)
      .maybeSingle();

    if (fetchError) {
      console.error('Error checking email existence:', fetchError);
      setError('Unable to verify email at this time. Please try again later.');
      return;
    }

    if (existing) {
      setError('This email is already on the waitlist.');
      return;
    }

    const { data, error } = await supabase
      .from('waitlist')
      .insert([{ email, username }]);

    if (error) {
      console.error('Supabase insert error:', error);
      setError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div className="max-w-md mx-auto pt-16 px-4 text-center flex flex-col min-h-screen">
      
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <Image
          src="/logo-512x512.png"
          alt="Brainstorm AI Logo"
          width={64}
          height={64}
        />
      </div>

      <h1 className="text-3xl font-bold mb-4">Turn your ideas into actionable plans</h1>
      <p className="text-lg mb-6">
        Brainstorm with AI and instantly generate Notion-style project pages.
      </p>

      {submitted ? (
        <p className="text-green-600">✅ Thanks for joining the waitlist!</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Your name (optional)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:opacity-90"
          >
            Join the Waitlist
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}

      <footer className="mt-auto pt-4 pb-4 text-sm text-gray-500 border-t border-gray-200 dark:border-gray-700">
        <div className="flex justify-center space-x-6">
          <Link href="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-blue-600">
            Terms & Conditions
          </Link>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Brainstorm AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
