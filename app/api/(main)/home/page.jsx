import AuthStatus from "../../../components/authStatus/AuthStatus";
import Feed from "../../../components/feed/Feed";
import RightSidebar from "../../../components/layout/RightSidebar";
import Sidebar from "../../../components/layout/Sidebar";
import { getTweets } from "../../../lib/getTweets";


export default async function HomePage() {
    const tweets = await getTweets();

    return (
        <div className="flex min-h-screen bg-black text-white">
            <Sidebar />
            <Feed tweets={tweets.posts} />
            <RightSidebar />
        </div>
    );
}