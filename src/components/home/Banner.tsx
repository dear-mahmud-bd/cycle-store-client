import { Link } from "react-router-dom";
import Building from "../../../public/buliding-sktech.png";
import Cycle from "../../../public/cycle-ride.png";

const Banner = () => {
  return (
    <div>
      <div className="overflow-hidden bg-[#F6F6F6] p-5 rounded-2xl">
        <div className="container relative">
          <div className="absolute -right-60 bottom-0 hidden w-[900px] lg:block">
            <div className="absolute left-0 top-0 h-full w-[200px] bg-gradient-to-r from-[#F6F6F6] to-transparent"></div>
            <img src={Building} alt="Cycle" loading="lazy" className="w-full" />
          </div>
          <div className="flex items-center justify-between">
            <div className="relative py-14 md:py-16">
              <div className="text-3xl sm:text-4xl/tight md:text-6xl/tight xl:text-[70px]/[84px]">
                <h1 className="font-bold">Bike With</h1>
                <h2 className="font-roboto font-medium italic">
                  Unmatchable dynamics
                </h2>
              </div>
              <p className="mt-3 text-gray md:text-xl">
                Your journey to the genuine begins here.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-5">
                <Link to={`/all-cycle`} type="button" className="btn">
                  See Details
                </Link>

                <a className="flex items-center gap-2.5 text-sm font-medium transition hover:opacity-80">
                  <span>Book test ride</span>
                  <div className="grid size-10 place-content-center rounded-full bg-success text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            <div className="relative hidden lg:block xl:h-96 2xl:h-[500px]">
              <img
                src={Cycle}
                alt="Cycle"
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
