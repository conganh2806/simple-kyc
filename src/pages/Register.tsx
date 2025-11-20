import z from "zod";
import logoImage from "../assets/kyc-logo.png";
import Input from "../components/Input";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "primereact/checkbox";
import { authApi } from "../services/authServices";
import { Link, useNavigate } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";
import { publicRoute } from "../routes/routes";
import { useToast } from "../contexts/ToastContext";
import { ToastStatus } from "../constants/Toast";

const registerSchema = z
  .object({
    email: z.email({ pattern: z.regexes.email }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    terms: z.boolean().refine((val) => val === true, {
      message: "You must accept the terms",
    }),
  })
  .refine((data) => data.password == data.confirmPassword, {
    error: "Password don't match",
    path: ["confirmPassword"],
  });

type RegisterFormInputs = z.infer<typeof registerSchema>;

const Register = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid, isSubmitting },
  } = useForm<RegisterFormInputs>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormInputs) => {
    try {
      await authApi.register({
        email: data.email,
        password: data.password,
      });

      showToast(ToastStatus.Success, "Success", "Register successfully!", 2000);

      navigate("/login");
    } catch (error: any) {
      console.log(error);
      const errorMessage = error.response?.data?.message || "Register failed";
      showToast(ToastStatus.Error, "Error", `${errorMessage}`);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex items-center gap-3 mb-11">
        <img
          src={logoImage}
          alt="Simple KYC logo"
          className="w-10 h-10 object-contain"
        ></img>
        <span className="text-2xl ">Sign-up for Simple KYC</span>
      </div>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-left text-gray-900">
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
          <div className="flex items-center justify-between mb-4">
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
                className="ml-2 text-sm text-gray-600 cursor-pointer select-none"
              >
                I accept the Terms and Conditions
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={!isValid}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md 
             hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold
             disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? (
              <ProgressSpinner className="w-full h-full text-white" />
            ) : (
              "Create account"
            )}
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
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
