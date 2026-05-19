"use client"

import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { signIn } from "next-auth/react"


export default function Login() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [pending, setPending] = useState(false);
   const router = useRouter();

   const [error, setError] = useState(null)

   const handleSubmit = async (e) =>  {
        e. preventDefault();
        setPending(true)
        const res = await signIn("credentials", {
            redirect: false,
            email, 
            password
        })

        if (res?.ok) {
            router.push('/');
            toast.success('Login is successful');
        } else if ( res?.status === 401) {
            setError("Invalid credentials");
            setPending(false);
        } else {
            setError('Something went wrong');
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
                    <h1 className="text-[120px] font-bold">𝕏</h1>
                </div>

                {/* <!-- Right --> */}
                <div className="max-w-md w-full mx-auto">
                    <h2 className="text-5xl font-extrabold mb-10">Welcome Back</h2>

                    {!!error && (
                        <div className="bg-red-400 p-3 rounded-2xl flex items-center gap-2 text-sm mb-6">
                            <TriangleAlert />
                            <p>{error}</p>
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <input
                                type="email"
                                disabled={pending}
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail( e.target.value )}
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
                                value={password}
                                onChange={(e) => setPassword( e.target.value )}
                                required
                                className="w-full bg-black border border-gray-700 rounded-md px-4 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                            />
                        </div>


                        {/* <!-- Login In Button --> */}
                        <button
                            type="submit"
                            disabled={pending}
                            className="w-full bg-white text-black font-bold py-3 rounded-full hover:bg-gray-200 transition"
                        >
                            Login In
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
                            onClick={(e) => handleProvider(e, "github")}
                            className="w-full border border-gray-700 py-3 rounded-full hover:bg-gray-900 transition"
                        >
                            Login in with Github
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
                        You don't have an account?
                        <a href="#" className="text-blue-500 hover:underline">
                            Sign up
                        </a>
                    </p>
                </div>

            </div>
        </div>
    );
};