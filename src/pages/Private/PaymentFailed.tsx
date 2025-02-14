import { Link } from "react-router-dom";

const PaymentFailed = () => {
  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="bg-white shadow-lg border border-gray-200 rounded-2xl p-8 max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">
          Payment Failed
        </h2>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong with your payment. Please try again or
          contact support.
        </p>

        <div className="mt-6 flex flex-col gap-4">
          <Link
            to="/"
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg transition"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
