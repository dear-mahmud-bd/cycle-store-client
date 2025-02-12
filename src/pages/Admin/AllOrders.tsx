/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useGetAllOrdersQuery } from "../../redux/features/orders/orderApi";
import { useAppSelector } from "../../redux/hooks";

const AllOrders = () => {
  const token = useAppSelector(useCurrentToken);
  const { data, isLoading, error } = useGetAllOrdersQuery(token);
  // const [updateOrderStatus] = useUpdateOrderStatusMutation();
  console.log(data);

  if (isLoading) return <p>Loading orders...</p>;
  if (error) return <p>Error fetching orders.</p>;

  const handleStatusChange = async (orderId, newStatus) => {
    // try {
    //   await updateOrderStatus({ orderId, status: newStatus });
    //   alert("Order status updated successfully");
    // } catch (err) {
    //   alert("Failed to update status");
    // }
  };

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
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="border select select-sm rounded p-1"
                    disabled={
                      order.status === "delivered" ||
                      order.status === "cancelled"
                    }
                  >
                    <option value="pending">pending</option>
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
