import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "@/store/slices/authApiSlice";

const LoginSchema = z.object({
  email: z.string().email("Invalid email address."),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters." }),
});

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate("/register");
  };
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();

  const onSubmit = async (data) => {
    try {
      const response = await loginUser({
        email: data.email,
        password: data.password,
      }).unwrap();
      if (response) {
        console.log("User logged in Successfully!!!");
        navigate("/");
        return null;
      }
    } catch (error) {
      console.error(`Error: ${error}`);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-6 xl:w-1/4 md:w-1/2 shadow-md bg-">
        <div className="w-full flex flex-col gap-y-3 items-center justify-center mb-8">
          <h1 className="text-2xl font-bold">Login</h1>
          <p className="text-muted-foreground text-sm">Access your account</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Email
              <Input
                autoComplete="email"
                placeholder="johndoe@email.com"
                {...register("email")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.identifier && (
              <p className="mt-2 text-sm text-red-600">
                {errors.identifier.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Password
              <Input
                autoComplete="current-password"
                placeholder="********"
                type="password"
                {...register("password")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Logging in" : "Log in"}
          </Button>
        </form>
        <div className="text-center mt-6">
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            onClick={handleRegisterClick}
          >
            Don&apos;t have an account? Register here
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default LoginForm;
