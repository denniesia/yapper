import RightSidebar from "../../components/layout/RightSidebar";
import Sidebar from "../../components/layout/Sidebar";
import TweetDetailsCard from "../../components/tweet/TweetDetailsCard";

async function getTweet(id) {
	const res = await fetch(`http://localhost:3001/api/tweets/${id}`);

	if (!res.ok) {
		throw new Error("Failed to fetch tweet");
	}

	return res.json();
}

export default async function TweetPage({ params }) {
	const { id } = await params;

	const tweet = await getTweet(id);

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Sidebar />
			<main className="flex-1 border-r border-gray-800 max-w-3xl">
				<div className="p-4 border-b border-gray-800 text-3xl font-bold mb-4">
					Tweet
				</div>
				<TweetDetailsCard tweet={tweet} />
			</main>

			<RightSidebar />
		</div>
	);
}
