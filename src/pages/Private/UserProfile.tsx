import { FieldValues, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const UserProfile = () => {
  const user = useAppSelector(selectCurrentUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData: FieldValues) => {
    console.log(formData);
  };
  
  return (
    <div>
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">My Profile</h1>
      </div>

      <div className="p-2 rounded-lg md:flex justify-between items-center">
        <div className="md:w-1/2 pb-5 flex justify-center items-cente mx-auto">
          <div className="flex flex-col items-center">
            <img
              src={`https://i.ibb.co.com/jD1GTj4/user.png`}
              alt="User Profile"
              className="w-32 h-32 rounded-full shadow-xl"
            />
            <h2 className="text-2xl font-semibold mt-2">User Name</h2>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>
        <div className="md:w-1/2 p-5 mx-auto border-2 border-dashed border-gray-400 rounded-lg">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Update Profile
          </h3>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-2"
          >
            <div>
              <label className="block text-sm font-medium">New Name</label>
              <input
                {...register("newName", { required: true })}
                type="text"
                className="input input-sm input-bordered w-full"
                placeholder="Enter your name"
              />
              {errors.newName && (
                <p className="text-red-500 text-sm">Name is required.</p>
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
              //   disabled={loading}
            >
              {/* {loading ? <span className="loading loading-spinner loading-xs"></span> : 'Update Profile'} */}
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
