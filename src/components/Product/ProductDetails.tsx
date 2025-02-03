import { Link, useParams } from "react-router-dom";
import { useGetASingleProductByIdQuery } from "../../redux/features/product/productApi";
import { useAppSelector } from "../../redux/hooks";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
const ProductDetails = () => {
  const user = useAppSelector(selectCurrentUser);
  const { id } = useParams(); // Get product ID from URL
  const { data, isLoading, error } = useGetASingleProductByIdQuery(id);
  const product = data?.data[0];
  console.log(product);

  if (isLoading) return <p>Loading product details...</p>;
  if (error) return <p>Error fetching product details.</p>;

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <img src={product.image} alt={product?.name} className="w-2/5 mx-auto" />
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
            <p className="text-gray-600 flex items-center gap-2">
              {product?.type}
            </p>
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
            <p className="text-gray-600 flex items-center gap-2">
              {product?.quantity}
            </p>
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
            <button className="btn btn-wide">Order Now</button>
          ) : (
            <Link to={`/sign-in`} className="btn btn-full">
              Please Sign in to purchase this product
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
