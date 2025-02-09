import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useGetASingleProductByIdQuery } from "../../redux/features/product/productApi";

const ManageSingleProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const { data, isLoading } = useGetASingleProductByIdQuery(id); // Fetch product details

  console.log("Product ID:", id);
  console.log("Fetched Product Data:", data?.data[0]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      type: "",
      brand: "",
      price: 0,
      imageUrl: "",
      quantity: 0,
      inStock: false,
      description: "",
    },
  });
  // Populate the form when data is available
  useEffect(() => {
    if (data?.data[0]) {
      reset({
        name: data.data[0].name || "",
        type: data.data[0].type || "",
        brand: data.data[0].brand || "",
        price: data.data[0].price ? parseFloat(data.data[0].price) : 0, // Ensure number
        imageUrl: data.data[0].image || "",
        quantity: data.data[0].quantity
          ? parseInt(data.data[0].quantity, 10)
          : 0, // Ensure number
        inStock: data.data[0].inStock || false,
        description: data.data[0].description || "",
      });
    }
  }, [data, reset]);

  const onSubmit = async (formData: FieldValues) => {
    const updatedData = {
      ...formData,
    };

    console.log("Updated Data:", updatedData);
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-5">
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">Manage Products</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid grid-cols-12 gap-2">
          {/* Product Name */}
          <div className="col-span-12 sm:col-span-8">
            <label className="block text-sm font-semibold">Name</label>
            <input
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
                validate: {
                  twoWords: (value) =>
                    value.trim().split(/\s+/).length >= 2 ||
                    "Name must contain at least 2 words",
                },
              })}
              type="text"
              className={`input input-sm input-bordered w-full ${
                errors.name ? "input-error" : ""
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">
                {errors.name.message as string}
              </p>
            )}
          </div>

          {/* Product Type */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-semibold">Type</label>
            <select
              {...register("type", { required: "Select a Type" })}
              className={`w-full select select-bordered select-sm max-w-xs mb-2 ${
                errors.type ? "input-error" : ""
              }`}
            >
              <option value="">Select Type</option>
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">
                {errors.type.message as string}
              </p>
            )}
          </div>

          {/* Brand */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-semibold">Brand</label>
            <input
              {...register("brand", { required: "Brand is required" })}
              type="text"
              className={`input input-sm input-bordered w-full ${
                errors.brand ? "input-error" : ""
              }`}
            />
            {errors.brand && (
              <p className="text-red-500 text-sm">
                {errors.brand.message as string}
              </p>
            )}
          </div>

          {/* Image URL */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-semibold">Image URL</label>
            <input
              {...register("imageUrl", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:jpeg|jpg|png|gif|bmp|webp))$/i,
                  message: "Enter a valid image URL",
                },
              })}
              type="text"
              className={`input input-sm input-bordered w-full ${
                errors.imageUrl ? "input-error" : ""
              }`}
            />
            {errors.imageUrl && (
              <p className="text-red-500 text-sm">
                {errors.imageUrl.message as string}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="col-span-12 sm:col-span-4">
            <label className="block text-sm font-semibold">Price</label>
            <input
              {...register("price", {
                required: "Price is required",
                min: { value: 0.01, message: "Price must be greater than 0" },
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message: "Enter a valid price",
                },
              })}
              type="number"
              step="0.01"
              className={`input input-sm input-bordered w-full ${
                errors.price ? "input-error" : ""
              }`}
            />
            {errors.price && (
              <p className="text-red-500 text-sm">
                {errors.price.message as string}
              </p>
            )}
          </div>

          {/* Quantity */}
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-semibold">Quantity</label>
            <input
              {...register("quantity", {
                required: "Quantity is required",
                min: { value: 1, message: "Quantity must be at least 1" },
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Quantity must be a positive whole number",
                },
              })}
              type="number"
              className={`input input-sm input-bordered w-full ${
                errors.quantity ? "input-error" : ""
              }`}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">
                {errors.quantity.message as string}
              </p>
            )}
          </div>

          {/* In Stock Checkbox */}
          <div className="col-span-12 sm:col-span-6 flex items-center gap-2">
            <label className="text-sm font-semibold">In Stock</label>
            <input
              {...register("inStock")}
              type="checkbox"
              className="checkbox checkbox-primary"
            />
          </div>

          {/* Product Description */}
          <div className="col-span-12">
            <label className="block text-sm font-semibold">Description</label>
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 50,
                  message: "Must be at least 50 characters",
                },
              })}
              rows={3}
              className={`textarea textarea-bordered w-full ${
                errors.description ? "input-error" : ""
              }`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message as string}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button type="submit" className="btn btn-active">
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManageSingleProduct;
