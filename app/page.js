import TweetCard from "./components/tweet/TweetCard";

async function getTweets() {
	const res = await fetch("https://dummyjson.com/posts");
	return res.json();
}

export default async function HomePage() {
	const tweets = await getTweets();
    console.log(tweets);

	return (
		<div className="flex min-h-screen bg-black text-white">
			<aside className="w-64 p-6 border-r border-gray-800 hidden md:flex flex-col justify-between">
				<div className="space-y-6">
					<h1 className="text-3xl font-bold">yapper</h1>
					<nav className="space-y-4 text-lg">
						<div className="hover:text-blue-400 cursor-pointer">Home</div>
						<div className="hover:text-blue-400 cursor-pointer">Explore</div>
						<div className="hover:text-blue-400 cursor-pointer">
							Notifications
						</div>
						<div className="hover:text-blue-400 cursor-pointer">Messages</div>
						<div className="hover:text-blue-400 cursor-pointer">Profile</div>
					</nav>
					<button className="w-full bg-blue-500 py-2 rounded-full font-semibold hover:bg-blue-600">
						Post
					</button>
				</div>
				<div className="text-sm text-gray-400">@username</div>
			</aside>

			{/* Feed */}
			<main className="flex-1 border-r border-gray-800 max-w-2xl">
				<div className="p-4 border-b border-gray-800 text-xl font-bold">
					Home
				</div>

				{/* Tweet Input */}
				<div className="p-4 border-b border-gray-800 flex space-x-4">
					<div className="w-12 h-12 bg-gray-700 rounded-full" />
					<div className="flex-1">
						<input
							className="w-full bg-transparent outline-none text-lg"
							placeholder="What's happening?"
						/>
						<div className="flex justify-end mt-2">
							<button className="bg-blue-500 px-4 py-1 rounded-full hover:bg-blue-600">
								Post
							</button>
						</div>
					</div>
				</div>

				{/* Tweets */}
				{tweets.posts.map((tweet) => (
                    <TweetCard key={tweet.id} tweet={tweet} />
                ))}
			</main>

			{/* Right Sidebar */}
			<aside className="w-80 p-6 hidden lg:block">
				<div className="bg-gray-900 p-4 rounded-xl mb-6">
					<h2 className="text-xl font-bold mb-2">Trends for you</h2>
					{["React", "OpenAI", "AI", "JavaScript"].map((trend) => (
						<div
							key={trend}
							className="py-2 hover:text-blue-400 cursor-pointer"
						>
							#{trend}
						</div>
					))}
				</div>

				<div className="bg-gray-900 p-4 rounded-xl">
					<h2 className="text-xl font-bold mb-2">Who to follow</h2>
					{[1, 2, 3].map((user) => (
						<div key={user} className="flex justify-between items-center py-2">
							<div>
								<div className="font-semibold">User {user}</div>
								<div className="text-gray-400 text-sm">@user{user}</div>
							</div>
							<button className="bg-white text-black px-3 py-1 rounded-full text-sm">
								Follow
							</button>
						</div>
					))}
				</div>
			</aside>
		</div>
	);
}
