"use client";

import { useState } from "react";
import ProfileEditModal from "./ProfileEditModal";



export default function Profile({ session }) {
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    
    if (!session) {
        redirect("/login");
    }

    return (
        <div  className="flex-1 border-r border-gray-800 max-w-3xl">
            <div  className="flex-1 border-r border-gray-800 max-w-3xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 px-4 py-3">
                    <h1 className="text-2xl font-bold ml-4">{session.user.name || session.user.username}</h1>
                    <p className="text-sm text-gray-500 ml-4">124 posts</p>
                </div>

                {/* Banner */}
                <div className="h-52 bg-gray-700 relative">
                    <img
                        src={session.user.banner || "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />

                    {/* Profile Image */}
                    <div className="absolute -bottom-18 left-4">
                        <img
                            src={session.user.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png' }
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 border-black object-cover"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="px-4 pt-10 pb-4 border-b border-gray-800">
                    <div className="flex justify-end">
                        <button 
                        onClick={() => setShowEditProfileModal(true)}
                        className="border border-gray-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
                            Edit profile
                        </button>
                    </div>

                    {
                        showEditProfileModal && (
                            <ProfileEditModal
                                onClose={() => setShowEditProfileModal(false)} 
                                onSave={(data) => console.log(data)} 
                                initialData={session.user}
                            />
                        )
                    }

                    <div className="mt-2">
                        <h2 className="text-2xl font-bold">@{session.user?.name}</h2>
                        <p className="text-gray-500 mt-1">{session.user?.email}</p>
                    </div>

                    <p className="mt-3 text-gray-200">
                        Full-stack developer building cool stuff with Next.js and Tailwind CSS.
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-3">
                        <div>📍 Germany</div>
                        <div>📅 Joined May 2026</div>
                    </div>

                    <div className="flex gap-5 mt-4 text-sm">
                        <div>
                            <span className="font-bold text-white">312</span>{" "}
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div>
                            <span className="font-bold text-white">12.4K</span>{" "}
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-800 text-sm font-medium">
                    <button className="flex-1 py-4 hover:bg-gray-900 border-b-2 border-blue-500">
                        Posts
                    </button>
                    <button className="flex-1 py-4 hover:bg-gray-900 text-gray-500">
                        Replies
                    </button>
                    <button className="flex-1 py-4 hover:bg-gray-900 text-gray-500">
                        Likes
                    </button>
                </div>

                {/* Posts */}
                <div>
                    {[1, 2, 3].map((post) => (
                        <div
                            key={post}
                            className="flex gap-3 px-4 py-4 border-b border-gray-800 hover:bg-gray-950 transition cursor-pointer"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop"
                                alt="Avatar"
                                className="w-12 h-12 rounded-full object-cover"
                            />

                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold">Dennis</span>
                                    <span className="text-gray-500">@dennisdev</span>
                                    <span className="text-gray-500">·</span>
                                    <span className="text-gray-500">2h</span>
                                </div>

                                <p className="mt-1 text-gray-200">
                                    Just finished building my Twitter clone with Next.js 🚀
                                </p>

                                <div className="flex justify-between max-w-md mt-4 text-gray-500 text-sm">
                                    <button className="hover:text-blue-400">💬 24</button>
                                    <button className="hover:text-green-400">🔁 12</button>
                                    <button className="hover:text-pink-400">❤️ 230</button>
                                    <button className="hover:text-blue-400">📤</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
