"use client"

import { useState } from "react";


export default function SignUp() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [pending, setPending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPending(true);

        const res = await fetch("api/auth/signup", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(form),
        })
    }

    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

                {/* <!-- Left --> */}
                <div className="hidden md:flex justify-center">
                    <h1 className="text-[120px] font-bold">𝕏</h1>
                </div>

                {/* <!-- Right --> */}
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-5xl font-extrabold mb-10">Create a new account</h2>


                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* <!-- Username --> */}
                        <div>
                            <input
                                type="text"
                                disabled={pending}
                                placeholder="Username"
                                value={form.username}
                                onChange={(e) => setForm({...form, username: e.target.value})}
                                required
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                disabled={pending}
                                placeholder="Email"
                                value={form.email}
                                onChange={(e) => setForm({...form, email: e.target.value })}
                                required
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* <!-- Password --> */}
                        <div>
                            <input
                                type="password"
                                disabled={pending}
                                placeholder="Password"
                                value={form.password}
                                onChange={(e) => setForm({...form, password: e.target.value })}
                                required
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                disabled={pending}
                                placeholder="Confirm Password"
                                value={form.confirmPassword}
                                onChange={(e) => setForm({...form, confirmPassword: e.target.value })}
                                required
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        {/* <!-- Sign In Button --> */}
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
                        >
                            Sign In
                        </button>

                        {/* <!-- Divider --> */}
                        <div className="flex items-center gap-3">
                            <div className="flex-1 h-px bg-gray-700"></div>
                            <span className="text-gray-500 text-sm">or</span>
                            <div className="flex-1 h-px bg-gray-700"></div>
                        </div>

                        {/* <!-- Google --> */}
                        <button
                            type="button"
                            className="w-full border border-gray-700 py-3 rounded-full hover:bg-gray-900 transition"
                        >
                            Sign in with Google
                        </button>

                        {/* <!-- Forgot --> */}
                        <div className="text-center">
                            <a href="#" className="text-blue-500 hover:underline text-sm">
                                Forgot password?
                            </a>
                        </div>
                    </form>

                    {/* <!-- Signup --> */}
                    <p className="text-gray-500 mt-10">
                        You already have an account? 
                        <a href="#" className="text-blue-500 hover:underline">
                            Login
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
};