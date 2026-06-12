"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function useCurrentUser() {
    const { data: session } = useSession();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!session?.user?.id) {
            setLoading(false);
            return;
        }

        async function fetchUser() {
            try {
                const res = await fetch(`/api/users/${session.user.id}`);
                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [session]);

    return { user, loading };
}