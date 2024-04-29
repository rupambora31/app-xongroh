import RegisterForm from "@/components/forms/RegisterForm";
import { useGetCurrentUserQuery } from "@/store/slices/authApiSlice";
import { Navigate } from "react-router-dom";

const RegisterPage = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <RegisterForm />
    </>
  );
};

export default RegisterPage;
