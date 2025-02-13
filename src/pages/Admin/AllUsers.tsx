/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Swal from "sweetalert2";
import {
  useGetAllUsersQuery,
  useUpdateUserBlockStatusMutation,
  useUpdateUserRoleMutation,
} from "../../redux/features/auth/authApi";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { showToast } from "../../utils/useToast";

const AllUsers = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, error, refetch } = useGetAllUsersQuery(token);
  const [updateUserBlockStatus, { isLoading: isUpdatingBlock }] =
    useUpdateUserBlockStatusMutation();
  const [updateUserRole, { isLoading: isUpdatingRole }] =
    useUpdateUserRoleMutation();

  const users = data?.data || [];

  // Function to handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change this user's role to '${newRole}'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes, change!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUserRole({ userId, role: newRole, token }).unwrap();
          showToast("success", `User role updated to '${newRole}'.`);
          refetch();
        } catch (error) {
          showToast("error", "Failed to update user role. Try again.");
        }
      }
    });
  };

  // Function to handle block/unblock
  const handleBlockStatusChange = async (
    userId: string,
    currentStatus: boolean
  ) => {
    const newStatus = !currentStatus;
    Swal.fire({
      title: "Are you sure?",
      text: `You want to ${newStatus ? "block" : "unblock"} this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await updateUserBlockStatus({
            userId,
            isBlocked: newStatus,
            token,
          }).unwrap();
          showToast(
            "success",
            `User has been ${newStatus ? "blocked" : "unblocked"}.`
          );
          refetch();
        } catch (error) {
          showToast("error", "Something went wrong. Try again.");
        }
      }
    });
  };

  if (isLoading || isUpdatingBlock || isUpdatingRole)
    return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details.</p>;

  return (
    <div className="">
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">All Users</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">#</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Activity</th>
              <th className="border border-gray-300 p-2">Role (Actions)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">
                  <button
                    onClick={() =>
                      handleBlockStatusChange(user._id, user.isBlocked)
                    }
                    disabled={user.role === "admin"}
                    className={`btn btn-xs px-2 py-1 rounded ${
                      user.isBlocked
                        ? "bg-red-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="select select-sm border rounded p-1"
                    disabled={user.role === "admin"}
                  >
                    <option value="customer">customer</option>
                    <option value="admin">admin</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
