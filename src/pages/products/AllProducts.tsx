/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ProductCard from "../../components/Product/ProductCard";
import { useGetProductsQuery } from "../../redux/features/product/productApi";

enum BicycleType {
  Mountain = "Mountain",
  Road = "Road",
  Hybrid = "Hybrid",
  BMX = "BMX",
  Electric = "Electric",
}

const AllProducts = () => {
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
  const { data, isLoading, error } = useGetProductsQuery({
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

  if (isLoading) return <div className="my-20 flex items-center justify-center"><span className="loading loading-ring loading-xl"></span></div>;
  if (error) return <p>Failed to load products.</p>;

  return (
    <div className="drawer lg:drawer-open">
      {/* Drawer toggle for mobile */}
      <input id="product-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Search Bar */}
        <div className="p-4 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border p-2 rounded w-full max-w-md"
          />
        </div>

        {/* Open drawer button for mobile */}
        <label
          htmlFor="product-drawer"
          className="btn btn-active drawer-button lg:hidden"
        >
          Filter Options
        </label>

        {/* Product Grid */}
        <div className="py-2">
          <div className="mx-auto grid max-w-[1852px] gap-2 px-2 sm:grid-cols-2 md:grid-cols-3 ">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
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

      {/* Sidebar Filters */}
      <div className="drawer-side mt-16 lg:-mt-5">
        <label
          htmlFor="product-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-5 space-y-4">
          <h2 className="text-lg font-bold mb-4">Filters</h2>

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

          <select
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Availability</option>
            <option value="true">In Stock</option>
            <option value="false">Out of Stock</option>
          </select>

          <button onClick={() => setPage(1)} className="btn btn-active mt-4">
            Apply Filters
          </button>
        </ul>
      </div>
    </div>
  );
};

export default AllProducts;
