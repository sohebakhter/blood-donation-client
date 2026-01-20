import { useNavigate } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

import bannerImg from "../assets/bloodBanner.jpg";
import bannerImg2 from "../assets/blood-donation-3.png";
import bannerImg3 from "../assets/bloodDonating.webp";
import { LuLogIn } from "react-icons/lu";

const Banner = () => {
  const navigate = useNavigate();

  const slides = [bannerImg, bannerImg2, bannerImg3];

  return (
    <div className="hero min-h-[600px] relative">
      {/* Background Swiper */}
      <div className="absolute inset-0">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade]}
          effect={"fade"}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url('${slide}')` }}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-[1]"></div>

      {/* Content */}
      <div className="hero-content relative md:top-25 lg:top-50 z-10 w-full px-4">
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-6
            max-w-6xl
            mx-auto
            mt-32
          "
        >
          {/* Join Donor Card */}
          <div
            onClick={() => navigate("/register")}
            className="bg-red-600 text-white
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              p-6 sm:p-10
              rounded-xl
              cursor-pointer
              transition-all duration-300
              hover:scale-105"
          >
            <div className="space-y-4 text-left">
              <h1 className="font-semibold text-2xl sm:text-3xl">
                Join as a Donor
              </h1>
              <p className="text-sm sm:text-base">
                Register now to become a blood donor and help save countless
                lives. Your small step can make a huge difference.
              </p>
            </div>

            <div className="text-4xl sm:text-5xl self-end sm:self-auto">
              <LuLogIn />
            </div>
          </div>

          {/* Search Donor Card */}
          <div
            onClick={() => navigate("/search")}
            className="
              bg-gray-600 text-white
              flex flex-col sm:flex-row
              justify-between
              items-start sm:items-center
              p-6 sm:p-10
              rounded-xl
              cursor-pointer
              transition-all duration-300
              hover:scale-105
            "
          >
            <div className="space-y-4 text-left">
              <h1 className="font-semibold text-2xl sm:text-3xl">
                Search Donors
              </h1>
              <p className="text-sm sm:text-base">
                Search for blood donors near you quickly and easily. Find the
                right match to save lives in time of need.
              </p>
            </div>

            <div className="text-4xl sm:text-5xl self-end sm:self-auto">
              <LuLogIn />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
