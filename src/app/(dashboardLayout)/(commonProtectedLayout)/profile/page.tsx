import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/getUserInfo";

const Profile = async () => {
  const userInfo = await getUserInfo();
  return userInfo ? <MyProfile userInfo={userInfo} /> : <div>Loading...</div>;
};

export default Profile;
