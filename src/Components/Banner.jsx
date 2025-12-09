import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  const handleJoinDonor = () => {
    navigate("/register");
  };

  const handleSearchDonors = () => {
    navigate("/search");
  };

  return (
    <div className="hero-overlay bg-opacity-60">
      <div
        className="hero h-100 max-w-7xl mx-auto"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1627956186075-950606f6f47d?auto=format&fit=crop&w=1400&q=80')",
        }}
      >
        <div className=""></div>

        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-xl">
            <h1 className="mb-5 text-5xl font-bold">
              Donate Blood, Save a Life
            </h1>
            <p className="mb-8 text-lg">
              Your contribution could be the reason someone gets a second
              chance.
            </p>

            <div className="flex justify-center gap-5">
              <button
                className="btn btn-error text-white"
                onClick={handleJoinDonor}
              >
                Join as a Donor
              </button>

              <button
                className="btn btn-outline btn-error"
                onClick={handleSearchDonors}
              >
                Search Donors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
