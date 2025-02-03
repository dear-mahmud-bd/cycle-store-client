import { useForm, FieldValues } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSigninMutation } from "../../redux/features/auth/authApi";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/features/auth/authSlice";
import { verifyToken } from "../../utils/verifyToken";
import { showToast } from "../../utils/useToast";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Use the loading state from the mutation
  const [signin, { isLoading }] = useSigninMutation();
  const onSubmit = async (formData: FieldValues) => {
    try {
      const res = await signin(formData).unwrap();
      const user = verifyToken(res?.data?.token);
      console.log("Decoded User:", user);
      dispatch(setUser({ user, token: res?.data?.token }));
      navigate(location?.state ? location.state : "/dashboard");
      showToast("success", "Signin Successful!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showToast(
        "error",
        err?.data?.message || "Something went wrong! Please try again."
      );
    }
  };
  return (
    <div className="flex justify-center items-center my-20">
      <fieldset className="fieldset w-full max-w-md bg-base-200 border-base-300 p-6 rounded-lg shadow-lg">
        <legend className="fieldset-legend text-3xl font-bold text-center">
          Welcome back
        </legend>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="fieldset-label block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Enter a valid email address",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Email"
            />
            {errors.email?.message && (
              <p className="text-red-500 text-sm">
                {typeof errors.email.message === "string"
                  ? errors.email.message
                  : "Invalid email"}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="fieldset-label block text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Password"
            />
            {errors.password?.message && (
              <p className="text-red-500 text-sm">
                {typeof errors.password.message === "string"
                  ? errors.password.message
                  : "Invalid password"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-soft w-full">
            {isLoading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        {/* Sign Up Section */}
        <div className="mt-4 text-center text-sm">
          <p>
            Don&apos;t have an account?
            <Link to="/sign-up" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default SignIn;
