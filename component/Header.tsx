import Link from "next/link";

export default function Header() {
    return (
        <header className="flex mb-2 border-b-1 justify-center">
            <Link 
            className="bg-blue-500 p-1 text-white m-2 active:bg-blue-600 hover:bg-blue-400"
            href={"/"}>
                Home
            </Link>
            <Link 
            className="bg-blue-500 p-1 text-white m-2 active:bg-blue-600 hover:bg-blue-400" 
            href="/login">
                Login
            </Link>
            <Link
            className="bg-blue-500 p-1 text-white m-2 active:bg-blue-600 hover:bg-blue-400"
            href={"/dashboard"}
            >
                Dashboard
            </Link>
        </header>
    );
}
