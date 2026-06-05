export async function getTweets() {
	const response = await fetch("http://localhost:3001/api/tweets", {
		cache: "no-store",
	});

	if (!response.ok) {
		throw new Error("Failed to fetch tweets");
	}

	return response.json();
}