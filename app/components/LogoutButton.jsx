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
        <button className="hover:text-blue-400 cursor-pointer"
            onClick={handleSignOut}
        >
            Logout
        </button>
    );
}