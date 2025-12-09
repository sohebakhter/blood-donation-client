const Featured = () => {
  const features = [
    {
      title: "Verified Donors",
      description:
        "All registered donors are verified through phone and identity checks, ensuring safe and reliable donation.",
      icon: "✔️",
    },
    {
      title: "Instant Search",
      description:
        "Find donors based on blood group and location within seconds, helping patients during critical emergencies.",
      icon: "⚡",
    },
    {
      title: "Community Support",
      description:
        "Our platform builds a network of heroes who help each other in times of need and create awareness about donation.",
      icon: "🤝",
    },
  ];

  return (
    <div className="py-16 bg-base-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Why Donate Through Us?
      </h2>

      <div className="grid md:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card bg-base-200 shadow-md hover:shadow-xl transition-all"
          >
            <div className="card-body items-center text-center">
              <span className="text-5xl">{feature.icon}</span>

              <h3 className="text-xl font-semibold mt-3">{feature.title}</h3>

              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
