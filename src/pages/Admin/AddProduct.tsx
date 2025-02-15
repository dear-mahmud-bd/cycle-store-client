import { FieldValues, useForm } from "react-hook-form";
import { useState } from "react";
import { useCreateProductMutation } from "../../redux/features/product/productApi";
import { showToast } from "../../utils/useToast";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentToken } from "../../redux/features/auth/authSlice";

const AddProduct = () => {
  const token = useAppSelector(useCurrentToken);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();
  watch("quantity", 0);
  const [inStock, setInStock] = useState(false);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  // Update inStock based on quantity
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = Number(e.target.value);
    setInStock(qty > 0);
    setValue("inStock", qty > 0);
  };

  const onSubmit = async (data: FieldValues) => {
    try {
      const productData = {
        ...data,
        price: parseFloat(data.price),
        quantity: parseInt(data.quantity, 10),
      };
      // console.log(productData);

      await createProduct({ productData, token }).unwrap();
      showToast("success", "Product Added Succesfully!");
      reset();
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      showToast("error", (error as any)?.data?.message || "Failed to add product.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
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
              {...register("type", { required: "Select a Category" })}
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
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/.*\.(?:jpeg|jpg|png|gif|bmp|webp))$/i,
                  message: "Enter a valid image URL (i.e., .jpeg, .jpg, .png, .gif, .bmp, .webp)",
                },
              })}
              type="text"
              className={`input input-sm input-bordered w-full ${
                errors.image ? "input-error" : ""
              }`}
            />
            {errors.image && (
              <p className="text-red-500 text-sm">
                {errors.image.message as string}
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
                  value: /^[0-9]+(\.[0-9]{1,2})?$/, // Allows decimals (e.g., 10.99)
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
              {...register("quantity", { required: "Quantity is required" })}
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

          {/* In Stock */}
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
          <button type="submit" className="btn btn-active" disabled={isLoading}>
            {isLoading ? "Adding..." : "Add Product"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
