/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import Banner from "../../components/home/Banner";
import Details from "../../components/home/Details";
import ProductCard from "../../components/Product/ProductCard";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Loading from "../../components/shared/Loading";

const Home = () => {
  const { data, isLoading } = useGetProductsQuery({ limit: 6 });
  
  const products = data?.data?.products?.slice(0, 6) || [];
  if (isLoading) return <Loading/>;

  return (
    <div>
      <Banner />

      <div className="my-10">
        <div className="text-center text-3xl sm:text-4xl/tight md:text-6xl/tight xl:text-[70px]/[84px]">
          <h1 className="font-bold">
            Our
            <span className="font-roboto font-medium italic"> Collection</span>
          </h1>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 mt-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>

        <div className="my-5 flex justify-center">
          <Link to={`/all-cycle`} type="button " className="btn">
            <span className="font-roboto font-medium italic">All Cycle Collection</span>
          </Link>
        </div>
      </div>

      <Details />
    </div>
  );
};

export default Home;
