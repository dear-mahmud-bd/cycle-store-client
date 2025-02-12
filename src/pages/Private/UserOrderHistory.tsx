/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetUserOrdersQuery } from "../../redux/features/orders/orderApi";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";

const UserOrderHistory = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, error } = useGetUserOrdersQuery({
    email: user?.email,
    token,
  });

  console.log(data?.data);

  if (isLoading) return <p>Loading your order history...</p>;
  if (error) return <p>Error fetching order history.</p>;

  // Handle status change
  const handleStatusChange = (orderId: string, newStatus: string) => {
    console.log(`Updating Order ID: ${orderId} to Status: ${newStatus}`);
    // Here, you would call an API to update the order status
  };

  return (
    <div>
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">My Order History</h1>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">Order ID</th>
              <th className="border border-gray-300 px-4 py-2">Product</th>
              <th className="border border-gray-300 px-4 py-2">Quantity</th>
              <th className="border border-gray-300 px-4 py-2">Total Price</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((order: any) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {order._id}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.product.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {order.quantity}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${order.totalPrice}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="border select select-sm rounded p-1"
                    disabled={order.status !== "pending"}
                  >
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
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

export default UserOrderHistory;
