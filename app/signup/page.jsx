"use client"

import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function SignUp() {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [pending, setPending] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

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

        const data = await res.json();

        if (res.ok) {
            setPending(false);
            
            toast.success(data.message)
            router.push('/login')
        } else if (res.status === 400) {
            setError(data.message);
            setPending(false)
        } else if (res.status === 500) {
            setError(data.message);
            setPending(false)
        }

       
    }


      const handleProvider = (event, value) => {
            event.preventDefault();
            signIn(value, {callbackUrl: "/"})
       }
    return (
        <div className="bg-black text-white min-h-screen flex items-center justify-center px-4">

            <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">

                {/* <!-- Left --> */}
                <div className="hidden md:flex justify-center">
                    <h1 className="text-[120px] font-bold">𝕐</h1>
                </div>

                {/* <!-- Right --> */}
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-5xl font-extrabold mb-10">Create a new account</h2>

                    {!!error && (
                        <div className="bg-red-400 p-3 rounded-2xl flex items-center gap-2 text-sm mb-6">
                            <TriangleAlert />
                            <p>{error}</p>
                        </div>
                    )}

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

                        {/* <!-- Github --> */}
                        <button
                            type="button"
                            className="w-full border border-gray-700 py-3 rounded-full hover:bg-gray-900 transition"
                            onClick={(e) => handleProvider(e, "github")}
                        >
                            Sign in with Github
                        </button>

                    </form>

                    {/* <!-- Signup --> */}
                    <p className="text-gray-500 mt-10">
                        You already have an account? 
                        <a href="/login" className="text-blue-500 hover:underline ml-2">
                            Login
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
};