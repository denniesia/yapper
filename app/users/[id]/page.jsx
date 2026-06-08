import RightSidebar from "../../components/layout/RightSidebar";
import Sidebar from "../../components/layout/Sidebar";
import Profile from "../../components/profile/Profile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function ProfilePage({ params }) {
    const { id } = await params;
  
  
      

  const res = await fetch(
    `http://localhost:3001/api/users/${id}`
  );

  const user = await res.json();

  return (
         <div className="flex min-h-screen bg-black text-white">
             <Sidebar />
             <Profile  user={user} />
             <RightSidebar />
         </div>
     );
}