"use client";

import { useEffect, useState } from "react";
import { X } from 'lucide-react';


export default function ProfileEditModal({ onClose, onSave, initialData }) {
    const [form, setForm] = useState({
        name: "",
        bio: "",
        location: "",
        image: "",
        banner: "",
    });
    const [formData, setFormData] = useState(initialData);

    useEffect(() => {
        if (!initialData) return;

        setForm({
            name: initialData.name || "",
            bio: initialData.bio || "",
            location: initialData.location || "",
            image: initialData.image || "",
            banner: initialData.banner || ""
            
        });
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSave(form);
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            onClick={onClose}
        >
            {/* Modal */}
            <div
                className="w-full max-w-xl bg-black rounded-2xl overflow-hidden border border-gray-800"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header (Twitter-like) */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
                    <button
                        onClick={onClose}
                        className="text-white text-lg px-2"
                    >
                        <X />
                    </button>

                    <h2 className="text-white font-bold text-lg">
                        Edit profile
                    </h2>

                    <button
                        onClick={handleSubmit}
                        className="bg-white text-black px-4 py-1 rounded-full font-semibold text-sm"
                    >
                        Save
                    </button>
                </div>

                {/* Banner */}
                {/* <div className="relative h-32 bg-gray-800">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-70"> 
                        <img src="" alt="" />
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center text-white text-sm opacity-80">
                        Change banner
                    </div>
                </div> */}

                {/* Avatar (Twitter overlap style) */}
                {/* <div className="px-4 relative">
                    <div className="absolute -top-10">
                        <div className="w-20 h-20 rounded-full bg-gray-600 border-4 border-black flex items-center justify-center text-white">
                            +
                        </div>
                    </div>
                </div> */}

                {/* Form */}
                <div className="px-4 pt-12 pb-6 space-y-4">
                    <div>
                        <label className="text-xs text-gray-400">Profile Image URL</label>
                        <input
                            type="url"
                            name="image"
                            value={form.image}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">Name</label>
                        <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400">Bio</label>
                        <textarea
                            name="bio"
                            value={form.bio}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white min-h-[80px]"
                        />
                    </div>

                    <div>
                        <label className="text-xs text-gray-400">Location</label>
                        <input
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-400">Banner URL</label>
                        <input
                            type="url"
                            name="banner"
                            value={form.banner}
                            onChange={handleChange}
                            className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white"
                        />
                    </div>
                    
                </div>
            </div>
        </div>
    );
}