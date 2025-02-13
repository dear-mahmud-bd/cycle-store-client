/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from "../../redux/features/orders/orderApi";
import { useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";
import { showToast } from "../../utils/useToast";

const AllOrders = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, error, refetch } = useGetAllOrdersQuery(token);
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();
  console.log(data);

  const [updateOrderStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to change status as '${newStatus}'`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33333",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log(orderId, newStatus);
        try {
          await updateOrderStatus({ orderId, newStatus, token }).unwrap();
          showToast("success", `Order ${newStatus}`);
          refetch();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.log(err);

          showToast("error", "Something Wrong try again");
        }
      }
    });
  };

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders.</p>;
  return (
    <div className="">
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">All Orders</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto table-sm w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Product</th>
              <th className="border border-gray-300 p-2">Total Quantity</th>
              <th className="border border-gray-300 p-2">Total Price</th>
              <th className="border border-gray-300 p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((order: any) => (
              <tr key={order._id} className="text-center">
                <td className="border border-gray-300 p-2">{order._id}</td>
                <td className="border border-gray-300 p-2">{order.email}</td>

                <td className="border border-gray-300 p-2">
                  <Link to={`/all-cycle/${order.product?._id}`}>
                    {order.product?._id}
                  </Link>
                </td>

                <td className="border border-gray-300 p-2">{order.quantity}</td>
                <td className="border border-gray-300 p-2">
                  ${order.totalPrice}
                </td>
                <td className="border border-gray-300 p-2">
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order._id, e.target.value)
                    }
                    className="border select select-sm rounded p-1"
                    disabled={
                      isUpdating ||
                      order.status === "delivered" ||
                      order.status === "cancelled"
                    }
                  >
                    <option value="pending" disabled={order.status==='approved'}>pending</option>
                    <option value="approved">approved</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
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

export default AllOrders;
