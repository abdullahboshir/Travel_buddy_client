import PrivateRoute from "@/components/PrivateRoute";
import MyProfile from "@/components/User/MyProfile";
import { authOptions } from "@/utils/authOptions";
import { userProfileApi } from "@/utils/getUserProfile";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


const MyProfilePage = async () => {
  const session = (await getServerSession(authOptions)) as any;

  if (!session) {
    redirect("/login");
    return null;
  }

  const accessToken = session.user.accessToken;

  if (!accessToken) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1>Access token not found</h1>
      </div>
    );
  }

  const userProfileRes = await userProfileApi(accessToken);



  return (
    <PrivateRoute>
     <div>
        <MyProfile userProfileRes={userProfileRes}/>
     </div>
    </PrivateRoute>
  );
};

export default MyProfilePage;
