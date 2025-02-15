import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import {
  useChangePasswordMutation,
  useGetUserByEmailQuery,
  useUpdateUserNameMutation,
} from "../../redux/features/auth/authApi";
import { showToast } from "../../utils/useToast";

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(useCurrentToken);

  const { data, isLoading, refetch } = useGetUserByEmailQuery({
    email: user?.email,
    token,
  });

  const [updateUserName, { isLoading: updating }] = useUpdateUserNameMutation();
  const [changePassword, { isLoading: changingPassword }] =
    useChangePasswordMutation();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    reset: profileReset,
    formState: { errors: errorsProfile },
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    watch,
    reset: passReset,
    formState: { errors: errorsPassword },
  } = useForm();

  const onSubmitProfile = async (formData: FieldValues) => {
    try {
      await updateUserName({
        email: user?.email,
        name: formData.newName,
        token,
      }).unwrap();
      showToast("success", "Profile Updated Successfully");
      refetch();
      profileReset();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      showToast("error", "Failed to update profile");
    }
  };

  const onSubmitPassword = async (formData: FieldValues) => {
    try {
      await changePassword({
        email: user?.email,
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        token,
      }).unwrap();
      showToast("success", "Password Updated Successfully");
      passReset();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      showToast("error", (error as any)?.data?.message || "Failed to update password");
    }
  };

  return (
    <div>
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">My Profile</h1>
      </div>

      <div className="p-2 rounded-lg md:flex justify-between items-center">
        <div className="md:w-1/2 pb-5 flex justify-center items-center mx-auto">
          <div className="flex flex-col items-center">
            <img
              src={`https://i.ibb.co.com/jD1GTj4/user.png`}
              alt="User Profile"
              className="w-32 h-32 rounded-full shadow-xl"
            />
            <h2 className="text-2xl font-semibold mt-2">
              {isLoading ? "Loading" : `${data?.data?.name}`}
            </h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="md:w-1/2 p-5 mx-auto border-2 border-dashed border-gray-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Update Profile
          </h3>
          <form
            onSubmit={handleSubmitProfile(onSubmitProfile)}
            className="space-y-2"
          >
            <div>
              <label className="block text-sm font-medium">New Name</label>
              <input
                {...registerProfile("newName", {
                  required: "Name is required",
                  minLength: {
                    value: 3,
                    message: "Name must be at least 3 characters long",
                  },
                })}
                type="text"
                className="input input-sm input-bordered w-full"
                placeholder={data?.data?.name}
              />
              {errorsProfile.newName && (
                <p className="text-red-500 text-sm">
                  {errorsProfile.newName.message as string}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder={user?.email}
                disabled
                className="input input-sm input-bordered w-full hover:cursor-not-allowed"
              />
            </div>
            <button
              type="submit"
              className="btn w-full mt-4"
              disabled={updating}
            >
              {updating ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Update Profile"
              )}
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-100 p-5 mt-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Change Password
        </h3>
        <form
          onSubmit={handleSubmitPassword(onSubmitPassword)}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <div>
            <label className="block text-sm font-medium">Old Password</label>
            <input
              {...registerPassword("oldPassword", {
                required: "Old password is required",
              })}
              type="password"
              className="input input-sm input-bordered w-full"
              placeholder="Enter old password"
            />
            {errorsPassword.oldPassword && (
              <p className="text-red-500 text-sm">
                {errorsPassword.oldPassword.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">New Password</label>
            <input
              {...registerPassword("newPassword", {
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "New password must be at least 6 characters long",
                },
              })}
              type="password"
              className="input input-sm input-bordered w-full"
              placeholder="Enter new password"
            />
            {errorsPassword.newPassword && (
              <p className="text-red-500 text-sm">
                {errorsPassword.newPassword.message as string}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium">
              Confirm New Password
            </label>
            <input
              {...registerPassword("confirmNewPassword", {
                required: "Please confirm your new password",
                validate: (value) =>
                  value === watch("newPassword") || "Passwords do not match",
              })}
              type="password"
              className="input input-sm input-bordered w-full"
              placeholder="Confirm new password"
            />
            {errorsPassword.confirmNewPassword && (
              <p className="text-red-500 text-sm">
                {errorsPassword.confirmNewPassword.message as string}
              </p>
            )}
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <button
              type="submit"
              className="btn w-full mt-4"
              disabled={changingPassword}
            >
              {changingPassword ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                "Change Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
