import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useCreateAccountMutation } from "@/store/slices/authApiSlice";

// Zod-Schema
const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Please enter your name",
    }),
    hometown: z.string().min(3, {
      message: "Please enter your hometown",
    }),
    email: z.string().email("Invalid email address."),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters." }),
    confirmPassword: z.string().min(1, {
      message: "Please confirm password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

const RegisterForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const handleLoginClick = () => {
    navigate("/login");
  };

  const [createAccount, { isLoading, isError, error }] =
    useCreateAccountMutation();

  const onSubmit = async (data) => {
    try {
      const response = await createAccount(data).unwrap();
      if (response) {
        console.log("User registered Successfully!!!");
        navigate("/");
        return null;
      }
    } catch (error) {
      console.error(`Error: ${error}`);

      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="p-6 xl:w-1/4 md:w-1/2 shadow-md bg-">
        <div className="w-full flex flex-col gap-y-3 items-center justify-center mb-8">
          <h1 className="text-2xl font-bold">Register</h1>
          <p className="text-muted-foreground text-sm">
            This marks a new beginning...
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Name
              <Input
                autoComplete="name"
                placeholder="John Doe"
                {...register("name")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.name && (
              <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Hometown
              <Input
                autoComplete="address-level2"
                placeholder="Guwahati"
                {...register("hometown")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.hometown && (
              <p className="mt-2 text-sm text-red-600">
                {errors.hometown.message}
              </p>
            )}
          </div>
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
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">
              Password
              <Input
                autoComplete="new-password"
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
          <div>
            <label className="block text-sm font-medium">
              Confirm Password
              <Input
                autoComplete="new-password"
                placeholder="********"
                type="password"
                {...register("confirmPassword")}
                className="mt-1 block w-full py-2 px-3 border sm:text-sm"
              />
            </label>
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <div className="text-center mt-6">
          <Button
            variant="link"
            className="font-normal w-full"
            size="sm"
            onClick={handleLoginClick}
          >
            Already have an account? Login here
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default RegisterForm;
