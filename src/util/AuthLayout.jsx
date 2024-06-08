import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthLayout = () => {
  const location = useLocation();
  const userData = useSelector((state) => state.user.userData);

  if (!userData || userData === null) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  // console.log("AuthLayout :: ", userData);

  return <Outlet />;
};

export default AuthLayout;
