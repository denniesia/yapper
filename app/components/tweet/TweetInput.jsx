export default function TweetInput() {
  return (
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
  );
}