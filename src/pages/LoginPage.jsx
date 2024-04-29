import LoginForm from "@/components/forms/LoginForm";
import { useGetCurrentUserQuery } from "@/store/slices/authApiSlice";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { data: user, isLoading } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <LoginForm />
    </>
  );
};

export default LoginPage;
