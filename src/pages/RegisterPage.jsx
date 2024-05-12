import RegisterForm from "@/components/forms/RegisterForm";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RegisterPage = () => {
  const userData = useSelector((state) => state.user.userData);

  console.log(userData);
  if (userData) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
