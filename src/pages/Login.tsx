import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { authApi } from "../services/authServices";
import { publicRoute } from "../routes/routes";
import { useToast } from "../contexts/ToastContext";
import { ToastStatus } from "../constants/Toast";

const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const res = await authApi.register({
        email: data.email,
        password: data.password,
      });

      showToast(ToastStatus.Success, "Success", "Login successfully!");

      navigate("/");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Login failed";
      showToast(ToastStatus.Error, "Error", errorMessage);
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Login to Your Account
        </h2>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="name@company.com"
              {...register("email")}
              error={errors?.email?.message}
            />
            <Input
              id="password"
              label="Your password"
              type="password"
              {...register("password")}
              error={errors?.password?.message}
            />
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md 
             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? <ProgressSpinner /> : "Login"}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?
          <Link
            to={publicRoute.register.path}
            className="text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
