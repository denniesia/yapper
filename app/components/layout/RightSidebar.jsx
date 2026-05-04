export default function RightSidebar() {
  return (
    <aside className="w-80 p-6 hidden lg:block">
      <div className="bg-gray-900 p-4 rounded-xl mb-6">
        <h2 className="text-xl font-bold mb-2">Trends for you</h2>
        {["React", "OpenAI", "AI", "JavaScript"].map((trend) => (
          <div key={trend} className="py-2 hover:text-blue-400 cursor-pointer">
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
  );
}