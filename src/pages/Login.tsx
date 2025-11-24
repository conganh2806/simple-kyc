import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Input from "../components/Input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { publicRoute } from "../routes/routes";
import { useToast } from "../contexts/ToastContext";
import { ToastStatus } from "../constants/Toast";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useEffect } from "react";
import { loginUser, resetAuthStatus } from "../features/auth/authSlice";

const loginSchema = z.object({
  email: z.email({ pattern: z.regexes.email }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/kyc";

  const { isLoading, error, isSuccess } = useAppSelector((state) => state.auth);

  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (isSuccess) {
      showToast(ToastStatus.Success, "Success", "Login successfully!");
      dispatch(resetAuthStatus());
      navigate(from, { replace: true });
    }

    if (error) {
      showToast(ToastStatus.Error, "Error", error);
      dispatch(resetAuthStatus());
    }
  }, [isSuccess, error, navigate, dispatch]);

  const onSubmit = async (data: LoginFormInputs) => {
    dispatch(loginUser(data));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">
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
          <div className="mb-4 flex items-center justify-between">
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
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70"
          >
            {isLoading ? "Logging in ..." : "Login"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
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
