import { Link, useParams } from "react-router-dom";
import { useGetASingleProductByIdQuery } from "../../redux/features/product/productApi";
import { useAppSelector } from "../../redux/hooks";
import {
  selectCurrentUser,
  useCurrentToken,
} from "../../redux/features/auth/authSlice";
import { FieldValues, useForm } from "react-hook-form";
import Loading from "../shared/Loading";
import { useCreateOrderMutation } from "../../redux/features/orders/orderApi";

const ProductDetails = () => {
  const token = useAppSelector(useCurrentToken);
  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams();
  const { data, isLoading, error } = useGetASingleProductByIdQuery(id);
  const product = data?.data[0];

  const [createOrder, { isLoading: paymentLoading, error: paymentError }] =
    useCreateOrderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      productId: id || "",
      productName: product?.name || "",
      email: user?.email || "",
      address: "",
      quantity: 1,
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error fetching product details.</p>;

  const handleOrderNow = () => {
    setValue("productId", id as string);
    setValue("productName", product?.name);
    const modal = document.getElementById("order_modal") as HTMLDialogElement | null;
    if (modal) {
      modal.showModal();
    } else {
      console.error("Modal element not found!");
    }
  };
  

  const onSubmit = async (formData: FieldValues) => {
    try {
      const orderData = {
        email: formData.email,
        product: id,
        quantity: parseInt(formData.quantity),
        totalPrice: totalPrice,
      };
      console.log("Order Details: ", orderData);
      const response = await createOrder({ orderData, token }).unwrap();
      window.location.replace(response.url);

      console.log("Order Response:", response);
    } catch (err) {
      console.error("Order Error:", err);
    }
  };

  const orderQuantity = watch("quantity");
  const totalPrice = orderQuantity * product?.price;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={product?.image} alt={product?.name} className="w-2/5 mx-auto" />
      <div className="p-6">
        <h2 className="text-3xl font-bold text-gray-800">{product?.name}</h2>
        <p className="text-gray-700 mb-4">{product?.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Brand</h3>
            <p className="text-gray-600">{product?.brand}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Type</h3>
            <p className="text-gray-600">{product?.type}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Availability
            </h3>
            <p className="text-gray-600">
              {product?.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">Quantity</h3>
            <p className="text-gray-600">{product?.quantity}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-700">
              Product Price
            </h3>
            <p className="text-gray-600">$ {product?.price}</p>
          </div>
        </div>

        <hr className="my-4 border-gray-700" />

        <div className="flex items-center justify-center">
          {user ? (
            <button className="btn btn-wide" onClick={handleOrderNow}>
              Order Now
            </button>
          ) : (
            <Link to={`/sign-in`} className="btn btn-full">
              Please Sign in to purchase this product
            </Link>
          )}
        </div>
      </div>

      {/* Order Modal */}
      <dialog id="order_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Order Details</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Product ID (Hidden) */}
            <input type="hidden" {...register("productId")} />

            {/* Product Name */}
            <div className="mt-4">
              <label className="block text-gray-700">Product Name</label>
              <input
                type="text"
                {...register("productName")}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Email */}
            <div className="mt-4">
              <label className="block text-gray-700">Your Email</label>
              <input
                type="email"
                {...register("email")}
                className="input input-bordered w-full"
                disabled
              />
            </div>

            {/* Address */}
            <div className="mt-4">
              <label className="block text-gray-700">Delivery Address</label>
              <textarea
                {...register("address")}
                placeholder="You will be contacted after the order is confirmed."
                disabled
                className="textarea textarea-bordered w-full"
              ></textarea>
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            {/* Order Quantity */}
            <div className="mt-4">
              <label className="block text-gray-700">Order Quantity</label>
              <input
                type="number"
                {...register("quantity", {
                  required: "Quantity is required",
                  min: { value: 1, message: "Order at least 1" },
                  max: {
                    value: product?.quantity,
                    message: `Cannot order more than ${product?.quantity}`,
                  },
                })}
                className="input input-bordered w-full"
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>

            {/* Total Price */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-700 flex justify-between">
                <span>
                  Total Price:
                  <span className="text-green-600">$ {totalPrice}</span>
                </span>
                {paymentError && (
                  <span className="text-red-600">Payment not completed.</span>
                )}
              </h3>
            </div>
            {paymentError ? "" : ""}

            {/* Actions */}
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Cancel</button>
              </form>
              <button type="submit" className="btn btn-primary">
                {paymentLoading ? "Loading..." : "Confirm Order"}
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductDetails;
