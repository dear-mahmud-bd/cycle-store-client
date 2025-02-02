import { useForm, FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "../../redux/features/auth/authApi";
import { showToast, sweetToast } from "../../utils/useToast";

const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [signup, { isLoading }] = useSignupMutation();

  const onSubmit = async (formData: FieldValues) => {
    const userInfo = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await signup(userInfo).unwrap();
      sweetToast("Success", "Account created successful! Please Sign in.","success");
      console.log("Signup Response: ", res);
      navigate('/sign-in');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      showToast("error", err?.data?.message || "Signup failed. Try again!");
    }
  };

  // Watch password field for confirm password validation
  const password = watch("password", "");

  return (
    <div className="flex justify-center items-center my-10">
      <fieldset className="fieldset w-full max-w-md bg-base-200 border-base-300 p-6 rounded-lg shadow-lg">
        <legend className="fieldset-legend text-3xl font-bold text-center">
          Register Now
        </legend>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="fieldset-label block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className="input input-bordered w-full"
              placeholder="Full Name"
            />
            {errors.name?.message && (
              <p className="text-red-500 text-sm">
                {typeof errors.name.message === "string"
                  ? errors.name.message
                  : "Invalid name"}
              </p>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div>
            <label className="fieldset-label block text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="input input-bordered w-full"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword?.message && (
              <p className="text-red-500 text-sm">
                {typeof errors.confirmPassword.message === "string"
                  ? errors.confirmPassword.message
                  : "Invalid confirmation"}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-soft w-full">
            {isLoading ? (
              <span className="loading loading-ring loading-xl"></span>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        {/* Sign In Section */}
        <div className="mt-4 text-center text-sm">
          <p>
            Already have an account?
            <Link to="/sign-in" className="text-blue-500 hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </fieldset>
    </div>
  );
};

export default SignUp;
