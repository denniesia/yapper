export async function createTweet(content, authorId) {
    const response = await fetch("/api/tweets", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            content,
            author: authorId,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to create tweet");
    }

    return response.json();
}