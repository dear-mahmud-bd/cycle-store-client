/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUsersQuery } from "../../redux/features/auth/authApi";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const AllUsers = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, error } = useGetAllUsersQuery(token);

  if (isLoading) return <p>Loading user details...</p>;
  if (error) return <p>Error fetching user details.</p>;

  const users = data?.data || [];

  // Function to handle role change
  const handleRoleChange = (userId: string, newRole: string) => {
    console.log(`Updating role for User ID: ${userId} to ${newRole}`);
    // Implement API call to update user role here
  };

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
              <th className="border border-gray-300 p-2">Role</th>
              <th className="border border-gray-300 p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any, index: number) => (
              <tr key={user._id} className="text-center">
                <td className="border border-gray-300 p-2">{index + 1}</td>
                <td className="border border-gray-300 p-2">{user.name}</td>
                <td className="border border-gray-300 p-2">{user.email}</td>
                <td className="border border-gray-300 p-2">{user.role}</td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
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
