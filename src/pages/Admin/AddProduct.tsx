import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  watch("quantity", 0);
  const [inStock, setInStock] = useState(false);

  // Update inStock based on quantity
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(e.target.value);
    setInStock(qty > 0);
    setValue("inStock", qty > 0);
  };

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <div className="max-w-5xl mx-auto my-5">
      <div className="mb-5 py-5 bg-gray-200 rounded-lg">
        <h1 className="text-center text-4xl font-bold">Add a Product</h1>
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
              {...register("category", { required: "Select a Category" })}
              className={`w-full select select-bordered select-sm max-w-xs mb-2 ${
                errors.category ? "input-error" : ""
              }`}
            >
              <option value="">All Categories</option>
              <option value="Mountain">Mountain</option>
              <option value="Road">Road</option>
              <option value="Hybrid">Hybrid</option>
              <option value="BMX">BMX</option>
              <option value="Electric">Electric</option>
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm">
                {errors.category.message as string}
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
                  message:
                    "Image must be a valid URL with a valid file extension (e.g., .jpg, .png)",
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
                  message: "Enter a valid price (e.g., 10 or 10.99)",
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
                  value: /^[1-9]\d*$/, // Ensures only positive whole numbers (no decimals, no negatives)
                  message: "Quantity must be a positive whole number",
                },
              })}
              type="number"
              className={`input input-sm input-bordered w-full ${
                errors.quantity ? "input-error" : ""
              }`}
              onChange={handleQuantityChange}
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">
                {errors.quantity.message as string}
              </p>
            )}
          </div>

          {/* In Stock (Boolean) */}
          <div className="col-span-12 sm:col-span-6">
            <label className="block text-sm font-semibold">In Stock</label>
            <input
              {...register("inStock")}
              type="checkbox"
              checked={inStock}
              className="checkbox checkbox-primary"
              readOnly
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
                  message: "Description must be at least 50 characters long",
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
