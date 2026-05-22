"use client"
import { useSession } from "next-auth/react";
import LogoutButton from "../LogoutButton"

export default function Sidebar() {

    const { data: session, status } = useSession();

    const username =
        status === "loading"
            ? "loading"
            : session?.user?.name || session?.user?.username || "Guest";



    return (
        <aside className="w-64 p-6 border-r border-gray-800 hidden md:flex flex-col justify-between">
            <div className="space-y-10">
                <h1 className="text-3xl font-bold">yapper</h1>
                <nav className="space-y-5 text-lg">
                    <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer mt-auto" >
                        <img src="/images/home.png" className="w-6 h-6" />
                        <a href="/">
                            Home
                        </a>
                    </div>
                    {/* <div className="hover:text-blue-400 cursor-pointer">Explore</div> */}
                    {/* <div className="hover:text-blue-400 cursor-pointer">Notifications</div> */}
                    {/* <div className="hover:text-blue-400 cursor-pointer">Messages</div> */}
                    <div className="flex items-center gap-2 hover:text-blue-400 cursor-pointer mt-auto" >
                        <img src="/images/profile.png" className="w-6 h-6" />
                        <a href="">
                            Profile
                        </a>
                    </div>
                    <LogoutButton />
                    <button className="w-full bg-blue-500 py-2 rounded-full font-semibold hover:bg-blue-600">
                        Post
                    </button>
                </nav>
            </div>
            <div className="text-sm text-gray-400">@{username}</div>
        </aside>
    );
}