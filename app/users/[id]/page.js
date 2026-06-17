import RightSidebar from "../../components/layout/RightSidebar";
import Sidebar from "../../components/layout/Sidebar";
import Profile from "../../components/profile/Profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getUser } from "../../lib/getUser";

export default async function ProfilePage({ params }) {
	const { id } = await params;

	const user = await getUser(id);

console.log(user)
	return (
		<div className="flex min-h-screen bg-black text-white">
			<Sidebar />
			<Profile user={user} />
			<RightSidebar />
		</div>
	);
}
