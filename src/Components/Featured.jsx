import logo from "../assets/logo.jpg";
const Featured = () => {
  const features = [
    {
      title: "Verified Donors",
      description:
        "All registered donors are verified through phone and identity checks, ensuring safe and reliable donation.",
    },
    {
      title: "Instant Search",
      description:
        "Find donors based on blood group and location within seconds, helping patients during critical emergencies.",
    },
    {
      title: "Community Support",
      description:
        "Our platform builds a network of heroes who help each other in times of need and create awareness about donation.",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <h2 className="text-5xl text-base-content font-bold text-center mb-10">
        Why Donate Through Us?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-6 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-200 text-base-content shadow-md hover:shadow-xl transition-all border border-base-300"
          >
            <div className="card-body items-center text-center">
              <img src={logo} alt="" className="rounded-2xl" />

              <h3 className="text-2xl font-semibold mt-3 text-base-content">
                {feature.title}
              </h3>

              <p className=" mt-2 text-base-content/80">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
