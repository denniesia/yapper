import LogoutButton from "../LogoutButton"

export default function Sidebar() {
    return (
        <aside className="w-64 p-6 border-r border-gray-800 hidden md:flex flex-col justify-between">
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">yapper</h1>
                <nav className="space-y-4 text-lg">
                    <div className="hover:text-blue-400 cursor-pointer">Home</div>
                    {/* <div className="hover:text-blue-400 cursor-pointer">Explore</div> */}
                    {/* <div className="hover:text-blue-400 cursor-pointer">Notifications</div> */}
                    {/* <div className="hover:text-blue-400 cursor-pointer">Messages</div> */}
                    <div className="hover:text-blue-400 cursor-pointer">Profile</div>
                    <LogoutButton />
                    <button className="w-full bg-blue-500 py-2 rounded-full font-semibold hover:bg-blue-600">
                        Post
                    </button>
                </nav>
            </div>
            <div className="text-sm text-gray-400">@username</div>
        </aside>
    );
}