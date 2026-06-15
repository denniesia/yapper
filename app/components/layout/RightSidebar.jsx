"use client"

import { useEffect, useState } from "react";
import Link from "next/link";


export default function RightSidebar() {
    const [usersToFollow, setUsersToFollow] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(
                    "http://localhost:3001/api/users"
                );

                const users = await res.json();
                setUsersToFollow(users.slice(0, 3));
            } catch (error) {
                console.log("GET ERROR:", error);
            }
        };

        fetchUsers();
    }, []);

    return (
        <aside className="w-80 p-6 hidden lg:block">
            <div className="bg-gray-900 p-4 rounded-xl mb-6">
                <h2 className="text-xl font-bold mb-2">Trends for you</h2>
                {["React", "OpenAI", "AI", "JavaScript"].map((trend) => (
                    <div key={trend} className="py-2 hover:text-blue-400 cursor-pointer">
                        #{trend}
                    </div>
                ))}
            </div>

            <div className="bg-gray-900 p-4 rounded-xl">
                <h2 className="text-xl font-bold mb-2">Who to follow</h2>
                {usersToFollow.map((user) => (
                    <div key={user._id} className="flex justify-between items-center py-2">
                        <div className="flex gap-1 items-center">
                            <Link href={`/users/${user._id}`}> 
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={
                                        user.image ||
                                        "https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png"
                                    }
                                    alt=""
                                />
                            </Link>
                            <div className="text-gray-400 text-sm">@{user.username}</div>
                        </div>
                        <button className="bg-white text-black px-3 py-1 rounded-full text-sm hover:bg-blue-300 cursor-pointer">
                            Follow
                        </button>
                    </div>
                ))}
            </div>
        </aside>
    );
}