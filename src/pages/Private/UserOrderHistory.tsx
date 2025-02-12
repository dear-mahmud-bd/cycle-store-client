/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useGetUserOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orders/orderApi";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";
import { showToast } from "../../utils/useToast";

const UserOrderHistory = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector((state) => state.auth.user);

  const { data, isLoading, error, refetch } = useGetUserOrdersQuery({
    email: user?.email,
    token,
  });
  console.log(data?.data);
  

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();

  // Handle status change
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to cancel order`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33333",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(orderId, newStatus);
        try {
          await updateOrderStatus({ orderId, newStatus, token }).unwrap();
          showToast("success", "Order Cancelled");
          refetch();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          showToast("error", "Something Wrong!");
        }
      }
    });
  };

  if (isLoading) return <p>Loading your order history...</p>;
  if (error) return <p>Error fetching order history.</p>;

  return (
    <div>
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">My Order History</h1>
      </div>

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
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border select select-sm rounded p-1"
                    disabled={isUpdating || order.status !== "pending"}
                  >
                    <option value="pending">Pending</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="approved" disabled>Approved</option>
                    <option value="delivered" disabled>Delivered</option>
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
