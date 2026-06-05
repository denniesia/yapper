
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import Feed from "./components/feed/Feed";
import RightSidebar from "./components/layout/RightSidebar";
import Sidebar from "./components/layout/Sidebar";
import { getTweets } from "./lib/getTweets";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function HomePage() {

	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/login");
	}

	const tweets = await getTweets();
	console.log(tweets)

	return (
		<div className="flex min-h-screen bg-black text-white">
			<Sidebar />
			<Feed tweets={tweets} />
			<RightSidebar />
		</div>
	);
}
