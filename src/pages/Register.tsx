import z from "zod";
import logoImage from "../assets/kyc-logo.png";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { publicRoute } from "../routes/routes";
import { useToast } from "../contexts/ToastContext";
import { ToastStatus } from "../constants/Toast";
import { useAppDispatch } from "../app/store";
import { useEffect } from "react";
import { registerUser, resetAuthStatus } from "../features/auth/authSlice";
import { type RootState } from "../app/store";
import { useSelector } from "react-redux";
import { registerSchema, type RegisterFormInputs } from "../schemas/auth";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isLoading, error, isSuccess } = useSelector(
    (state: RootState) => state.auth,
  );

  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      terms: false,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      showToast(
        ToastStatus.Success,
        "Success",
        "Registration successful! Please login.",
      );

      dispatch(resetAuthStatus());

      navigate("/login");
    }

    if (error) {
      showToast(ToastStatus.Error, "Registration Failed", error);
      dispatch(resetAuthStatus());
    }
  }, [isSuccess, error, dispatch, navigate, showToast]);

  const onSubmit = async (data: RegisterFormInputs) => {
    dispatch(
      registerUser({
        email: data.email,
        password: data.password,
      }),
    );
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
      <div className="mb-11 flex items-center gap-3">
        <img
          src={logoImage}
          alt="Simple KYC logo"
          className="h-10 w-10 object-contain"
        ></img>
        <span className="text-2xl">Sign-up for Simple KYC</span>
      </div>
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-md">
        <h2 className="text-left text-2xl font-bold text-gray-900">
          Create a Free Account
        </h2>
        <form className="mt-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="email"
            label="Your email"
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
          <Input
            id="confirm-password"
            label="Confirm password"
            type="password"
            {...register("confirmPassword")}
            error={errors?.confirmPassword?.message}
          />
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center">
              <Controller
                name="terms"
                control={control}
                render={({ field, fieldState }) => (
                  <Checkbox
                    inputId={field.name}
                    onChange={(e) => field.onChange(e.checked)}
                    checked={field.value}
                    className={fieldState.error ? "p-invalid" : ""}
                  />
                )}
              />
              <label
                htmlFor="terms"
                className="ml-2 cursor-pointer text-sm text-gray-600 select-none"
              >
                I accept the Terms and Conditions
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="w-full rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-400 disabled:opacity-70"
          >
            {isLoading ? "Creating Account..." : "Create account"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?
          <Link
            to={publicRoute.login.path}
            className="text-blue-600 hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
