import Banner from "../../components/home/Banner";
import Details from "../../components/home/Details";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="my-20">
        <p>All Products</p>
      </div>
      <Details></Details>
    </div>
  );
};

export default Home;
