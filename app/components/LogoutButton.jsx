"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();
    const { data: session } = useSession();

    const handleSignOut = async () => {
        await signOut({
            redirect: false,
        });

        router.push("/login");
    };

    if (!session) return null;

    return (
        <button className="flex items-center gap-2 hover:text-blue-400 cursor-pointer mt-auto" 
            onClick={handleSignOut}
        >
            <img src="/images/logout.png" className="w-6 h-6" />
            Logout
        </button>
    );
}