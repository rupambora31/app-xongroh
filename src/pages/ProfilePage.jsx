import { Button } from "@/components/ui/button";
import { useDeleteSessionMutation } from "@/store/slices/authApiSlice";
import {  setLogout } from "@/store/slices/userSlice";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const [deleteSession, { isLoading }] = useDeleteSessionMutation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await deleteSession().unwrap();
      dispatch(setLogout());
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete session:", error);
      // Handle error appropriately
    }
  };

  return (
    <>
      <div>
        <div>Profile</div>
        <div>
          <Button onClick={handleLogout} disabled={isLoading}>
            Logout
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
