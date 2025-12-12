import { useNavigate } from "react-router";
import bannerImg from "../assets/bloodBanner.jpg";
import { LuLogIn } from "react-icons/lu";

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
        className="h-[600px] bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('${bannerImg}')` }}
      >
        <div className=""></div>

        <div className="hero-content text-center text-neutral-content">
          <div className="relative">
            <div className="absolute -bottom-[400px] left-1/2 -translate-x-1/2 flex">
              <div
                className="bg-red-600 text-white flex items-center justify-between px-10 space-x-5 hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={handleJoinDonor}
              >
                <div className="space-y-5 py-5">
                  <h1 className="text-white font-semibold text-4xl text-start">
                    Join as a Donor
                  </h1>
                  <p className="text-start">
                    Register now to become a blood donor and help save countless
                    lives. Your small step can make a huge difference.
                  </p>
                </div>
                <div className="text-5xl">
                  <LuLogIn />
                </div>
              </div>
              <div
                className="bg-gray-600 text-white flex items-center justify-between px-10 space-x-5 w-[800px] h-60 hover:cursor-pointer transition-all duration-300 transform hover:scale-105"
                onClick={handleSearchDonors}
              >
                <div className="space-y-5 py-5">
                  <h1 className="text-white font-semibold text-4xl text-start">
                    Search Donors
                  </h1>
                  <p className="text-start">
                    Search for blood donors near you quickly and easily. Find
                    the right match to save lives in time of need.
                  </p>
                </div>
                <div className="text-5xl">
                  <LuLogIn />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
