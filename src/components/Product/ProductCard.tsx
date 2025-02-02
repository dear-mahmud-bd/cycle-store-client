type ProductProps = {
  product: {
    name: string;
    brand: string;
    inStock: boolean;
    price: number;
    type: string;
    image: string;
  };
};

const ProductCard = ({ product }: ProductProps)=> {
  const { name, brand, inStock, price, type, image } = product;

  return (
    <div className="flex flex-col overflow-hidden rounded-[10px] bg-[url(../../../public/collection-bg.jpg)] bg-cover bg-no-repeat">
      <div className="group flex h-52 shrink-0 items-center justify-center p-2 ">
        <img
          src={image ? image : "https://i.ibb.co.com/HLBzrLCg/bycycle.jpg"}
          alt={name}
          loading="lazy"
          className="h-full w-full rounded-2xl object-contain transition-all duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex h-full flex-col items-start gap-5 pl-5 pb-5">
        <div className="grow">
          <a className="mb-2 inline-block text-xl font-medium transition hover:opacity-80">
            {name}
          </a>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Brand:</span> {brand}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Available:</span> {inStock?"YES":"NO"}
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-medium">Category:</span> {type}
          </p>
          <p className="text-lg font-semibold text-gary-600">$ {price}</p>
        </div>
        <a className="btn bg-gary-600 px-4 rounded-lg transition hover:bg-gary-700">
          View Details
        </a>
      </div>
    </div>
  );
};

export default ProductCard;
