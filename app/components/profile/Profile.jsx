"use client";

import { useEffect, useState } from "react";
import ProfileEditModal from "./ProfileEditModal";
import TweetCard from "../tweet/TweetCard"
import { useRouter } from "next/navigation";
import useCurrentUser from "../../hooks/useCurrentUser";




export default function Profile({ user: profileUser }) {
    const { user: currentUser } = useCurrentUser();
    const [showEditProfileModal, setShowEditProfileModal] = useState(false);
    const [userTweets, setUserTweets] = useState([]);

    const router = useRouter();

    const isOwnProfile =
        currentUser?._id === profileUser?._id;

    const createdAt = new Date(profileUser.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

    useEffect(() => {
        async function fetchTweets() {
            try {
                const res = await fetch(
                    `http://localhost:3001/api/tweets/user/${profileUser._id}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch tweets");
                }

                const data = await res.json();

                setUserTweets(data);
            } catch (err) {
                console.error(err);
            }
        }
        if (profileUser?._id) {
            fetchTweets();
        }
    }, [profileUser]);


    const handleSaveProfile = async (data) => {
        try {
            const res = await fetch(`http://localhost:3001/api/users/${profileUser._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    bio: data.bio,
                    location: data.location,
                    image: data.image,
                    banner: data.banner
                }),
            });

            if (!res.ok) throw new Error("Failed to update profile");

            const updatedUser = await res.json();

            setShowEditProfileModal(false);
            router.refresh();

        } catch (err) {
            console.error(err);
        }
    };

    return (

        <div className="flex-1 border-r border-gray-800 max-w-3xl">
            <div className="flex-1 border-r border-gray-800 max-w-3xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-black/80 backdrop-blur border-b border-gray-800 px-4 py-3">
                    <h1 className="text-2xl font-bold ml-4">{profileUser.name || profileUser.username}</h1>
                    <p className="text-sm text-gray-500 ml-4">{profileUser.tweets?.length} posts</p>
                </div>

                {/* Banner */}
                <div className="h-52 bg-gray-700 relative">
                    <img
                        src={profileUser.banner || "https://images.unsplash.com/photo-1729575846511-f499d2e17d79?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />

                    {/* Profile Image */}
                    <div className="absolute -bottom-18 left-4">
                        <img
                            src={profileUser.image || 'https://media.idownloadblog.com/wp-content/uploads/2017/03/Twitter-new-2017-avatar-001.png'}
                            alt="Profile"
                            className="w-36 h-36 rounded-full border-4 border-black object-cover"
                        />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="px-4 pt-10 pb-4 border-b border-gray-800">
                    {isOwnProfile && (
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowEditProfileModal(true)}
                                className="border border-gray-600 px-5 py-2 rounded-full font-semibold hover:bg-gray-900 transition">
                                Edit profile
                            </button>
                        </div>
                    )
                    }

                    {
                        showEditProfileModal && (
                            <ProfileEditModal
                                onClose={() => setShowEditProfileModal(false)}
                                onSave={handleSaveProfile}
                                initialData={profileUser}
                            />
                        )
                    }

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">@{profileUser?.username}</h2>
                        <p className="text-gray-500 mt-1">{profileUser?.email}</p>
                    </div>

                    <p className="mt-3 text-gray-200">
                        {profileUser.bio}
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-500 text-sm mt-3">
                        {profileUser.location && <div>📍 {profileUser.location}</div>}
                        {profileUser.createdAt && <div>📅 Joined {createdAt}</div>}
                    </div>

                    {/* <div className="flex gap-5 mt-4 text-sm">
                        <div>
                            <span className="font-bold text-white">312</span>{" "}
                            <span className="text-gray-500">Following</span>
                        </div>
                        <div>
                            <span className="font-bold text-white">12.4K</span>{" "}
                            <span className="text-gray-500">Followers</span>
                        </div>
                    </div> */}
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
                    {userTweets.length > 0 
                        ? userTweets.map(tweet => (
                            <TweetCard key={tweet._id} tweet={tweet} />
                        ))
                        : <p className="text-center italic mt-10 text-gray-500">No posts yet</p>
                    }

                </div>
            </div>
        </div>
    );
}
