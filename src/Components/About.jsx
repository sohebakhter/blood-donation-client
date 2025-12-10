import React from "react";

const About = () => {
  return (
    <section className="max-w-5xl mx-auto py-16 px-6 text-gray-800">
      <h1 className="text-4xl font-bold text-center mb-6">
        About <span className="text-red-600">LifeSaver Hub</span>
      </h1>

      <p className="text-lg leading-8 mb-6 text-center">
        LifeSaver Hub is a community-driven platform dedicated to connecting
        blood donors with people in urgent need. We also provide a trusted way
        for users to contribute small funds to support medical emergencies,
        transportation, and social wellness projects.
      </p>

      <div className="grid md:grid-cols-3 gap-6 mt-12">
        <div className="p-6 shadow-md rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">📌 Our Mission</h2>
          <p>
            To create a reliable, fast, and transparent donation network where
            every drop of blood and every small fund can save a life.
          </p>
        </div>

        <div className="p-6 shadow-md rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">🤝 Why This Matters</h2>
          <p>
            Thousands of people face challenges finding donors quickly.
            LifeSaver Hub bridges that gap using technology and community power.
          </p>
        </div>

        <div className="p-6 shadow-md rounded-lg border">
          <h2 className="text-2xl font-semibold mb-2">🚀 Our Vision</h2>
          <p>
            A world where help reaches on time—where saving a life is just a
            click away regardless of location, situation, or financial ability.
          </p>
        </div>
      </div>

      <footer className="text-center mt-10 text-gray-600">
        Developed with ❤️ to serve humanity.
      </footer>
    </section>
  );
};

export default About;
