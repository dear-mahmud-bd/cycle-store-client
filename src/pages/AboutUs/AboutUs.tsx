const AboutUs = () => {
  return (
    <section className="">
      <div className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="font-heading mb-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase title-font">
              About Our Bicycle Shop
            </h2>
            <p className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight text-gray-900 sm:text-4xl">
              Ride with Passion, Ride with Quality
            </p>
            <p className="mt-4 max-w-4xl text-lg text-gray-500 lg:mx-auto">
              We are committed to providing high-quality bicycles and
              exceptional service to all cycling enthusiasts. Whether you're a
              beginner or a pro, we have the perfect ride for you.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Wide Selection
                  </p>
                </div>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Choose from a variety of top-brand bicycles, accessories, and
                  gear to enhance your cycling experience.
                </div>
              </div>
              <div className="relative">
                <div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Expert Service
                  </p>
                </div>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  Our team of skilled mechanics provides high-quality repairs,
                  maintenance, and customization services.
                </div>
              </div>
              <div className="relative">
                <div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Eco-Friendly
                  </p>
                </div>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  We promote sustainable and eco-friendly transportation by
                  encouraging more people to ride bicycles.
                </div>
              </div>
              <div className="relative">
                <div>
                  <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-700">
                    Customer Support
                  </p>
                </div>
                <div className="mt-2 ml-16 text-base text-gray-500">
                  We prioritize customer satisfaction and provide expert advice
                  to help you choose the right bike.
                </div>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
