/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import Swal from "sweetalert2";
import { showToast } from "../../utils/useToast";
import Loading from "../../components/shared/Loading";

enum BicycleType {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

const ManageProduct = () => {
  const token = useAppSelector(useCurrentToken);

  // State for filters and pagination
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("price");
  const [sortOrder, setSortOrder] = useState("asc");
  const [type, setType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStock, setInStock] = useState("");
  const [page, setPage] = useState(1);
  const limit = 9;

  // Fetch products with query params
  const { data, isLoading, refetch } = useGetProductsQuery({
    search,
    minPrice,
    maxPrice,
    type,
    inStock,
    sortBy,
    sortOrder,
    page,
    limit,
  });
  const products = data?.data?.products || [];
  const pagination = data?.data?.pagination || {};

  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You want to delete this Product'?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33333",
      cancelButtonColor: "#008000",
      confirmButtonText: "Yes!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProduct({ id, token }).unwrap();
          showToast("success", `Delete This product Successfully`);
          refetch();
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          showToast("error", "Something Wrong!");
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div className="">
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">Manage Products</h1>
      </div>
      {/* Filters at the top */}
      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full max-w-xs"
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Types</option>
          {Object.values(BicycleType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        <select
          value={inStock}
          onChange={(e) => setInStock(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">Availability</option>
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>

        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border p-2 rounded"
        />

        <button onClick={() => setPage(1)} className="btn btn-active">
          Apply Filters
        </button>
      </div>

      {/* Product Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Type</th>
              <th className="border border-gray-300 p-2">Price</th>
              <th className="border border-gray-300 p-2">Stock</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <tr key={product._id} className="text-center">
                <td className="border border-gray-300 p-2">
                  <Link to={`/all-cycle/${product._id}`}>{product.name}</Link>
                </td>
                <td className="border border-gray-300 p-2">{product.type}</td>
                <td className="border border-gray-300 p-2">${product.price}</td>
                <td className="border border-gray-300 p-2">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </td>
                <td className="border border-gray-300 p-1">
                  <Link
                    to={`/dashboard/manage-products/${product._id}`}
                    className="btn btn-sm bg-blue-500 text-white px-4 py-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm bg-red-500 text-white px-3 py-1 rounded ml-1"
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-5">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={pagination.currentPage === 1}
          className="btn"
        >
          Previous
        </button>
        <span>
          Page {pagination.currentPage} of {pagination.totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!pagination.hasNextPage}
          className="btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
