export async function getTweets() {
  const res = await fetch("https://dummyjson.com/posts", {
    cache: "no-store", // important for fresh data
  });

  if (!res.ok) throw new Error("Failed to fetch tweets");

  return res.json();
}