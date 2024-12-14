const Hero = () => {
  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-green-600 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-white md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Decentralized Travel Booking Application
            </h1>
            <p className="text-xl mb-8">
              Experience seamless travel planning and booking with our community-driven platform.
            </p>
            <div className="space-x-4">
              <a href="#explore" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
                Explore Destinations
              </a>
              <a href="#about" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img 
              src="/images/hero-travel.png" 
              alt="Decentralized Travel Booking" 
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
  