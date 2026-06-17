import { toast } from "sonner";

export async function createTweet(content) {
    const response = await fetch(`${process.env.BASE_URL}/api/tweets`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create tweet");
    }

    toast.success("Tweet created successfully");

    return response.json();
}