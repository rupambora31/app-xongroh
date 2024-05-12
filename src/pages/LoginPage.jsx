import LoginForm from "@/components/forms/LoginForm";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const userData = useSelector((state) => state.user.userData);

  console.log(userData);
  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
