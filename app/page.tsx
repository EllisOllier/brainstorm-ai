"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="max-w-md mx-auto pt-16 px-4 flex flex-col min-h-screen
                 bg-white
                 prose prose-lg prose-indigo
                 transition-colors duration-300 ease-in-out
                 text-center"
    >
      <header>
        <Link href='/login'>Login</Link>
        <Link href={'/dashboard'}>Dashboard</Link>
      </header>
      <div className="flex justify-center mb-6">
        <Image
          src="/brainstorm-white-blue.svg"
          alt="Brainstorm AI Logo"
          width={64}
          height={64}
          priority
        />
      </div>

      <h1 className="font-bold mb-6">
        Welcome to Brainstorm AI
      </h1>

      {/* Removed DarkModeToggle */}

      <footer
        className="mt-auto pt-4 pb-4 text-sm border-t border-gray-200"
      >
        <div className="flex justify-center space-x-6">
          <Link
            href="/privacy-policy"
            className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-blue-600 transition-colors duration-300 ease-in-out"
          >
            Terms & Conditions
          </Link>
        </div>
        <p className="mt-4">&copy; {new Date().getFullYear()} Brainstorm AI. All rights reserved.</p>
      </footer>
    </main>
  );
}
