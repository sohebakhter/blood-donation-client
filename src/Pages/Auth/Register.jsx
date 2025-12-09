import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useLoaderData, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const { createUser, updateUser } = useAuth();
  const [upazilas, setUpazilas] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const realData = useLoaderData();
  useEffect(() => {
    fetch("./upazilas.json")
      .then((res) => res.json())
      .then((data) => {
        setUpazilas(data); //upazilas একটি array
      })
      .catch((err) => console.log(err));
  }, []);

  const selectedDistrict = useWatch({ control, name: "district" });
  // console.log("selectedDistrict", selectedDistrict);

  const upazilaByDistrictId = (districtId) => {
    const districtUpazilas = upazilas.filter(
      (u) => u.district_id === districtId
    );
    const upazilasName = districtUpazilas.map((u) => u.name);
    return upazilasName;
  };

  const handleRegister = (data) => {
    console.log("real data", data);
    const profielImg = data.photo[0];
    // get district name from id
    const districtName = realData.find((d) => d.id === data.district);

    // validate password and confirm password
    if (data.password !== data.confirmPassword) {
      toast.error("Password and Confirm Password do not match");
      return;
    }

    createUser(data.email, data.password)
      .then((result) => {
        console.log("present check", result.user);
        //1.store the image in form data
        const formData = new FormData();
        formData.append("image", profielImg);
        // 2. send the photo to store and get the url
        const imageapiURL = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_image_host_key
        }`;
        axios.post(imageapiURL, formData).then((res) => {
          const photoURL = res.data.data.url;
          // creating user to database
          const userInfo = {
            displayName: data.name,
            photoURL: photoURL,
            email: data.email,
            bloodGroup: data.bloodGroup,
            district: districtName.name,
            upazila: data.upazila,
            status: "active",
          };
          axiosSecure.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to database");
            }
          });
          // update user profile to firebase
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUser(userProfile)
            .then(() => {
              console.log("user info updated");
              toast.success("Registration Successful, Updated your profile");
              navigate(location?.state || "/");
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              {/* email */}
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email Is Required</p>
              )}

              {/* name */}
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name Is Required</p>
              )}
              {/* photo image section */}
              <label className="label">Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input"
                placeholder="Your Photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">photo Is Required</p>
              )}

              {/* blood Group */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend">Blood Group</legend>
                <select
                  defaultValue="Pick a browser"
                  {...register("bloodGroup", { required: true })}
                  className="select"
                >
                  <option disabled={true}>Pick a Blood Group</option>
                  {["A+", "A-", " B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                    (b, i) => (
                      <option key={i} value={b}>
                        {b}
                      </option>
                    )
                  )}
                </select>
              </fieldset>

              {/* Select Districts */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Select Districts</legend>
                <select
                  defaultValue="Pick a District"
                  {...register("district", { required: true })}
                  className="select"
                >
                  <option disabled={true}>Pick a District</option>
                  {realData.map((d, i) => (
                    <option key={i} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* Select Upazila */}
              <fieldset className="fieldset">
                <legend className="fieldset-legend"> Select Upazila</legend>
                <select
                  defaultValue="Pick a Upazila"
                  {...register("upazila", { required: true })}
                  className="select"
                >
                  <option disabled={true}>Pick a Upazila</option>
                  {upazilaByDistrictId(selectedDistrict).map((u, i) => (
                    <option key={i} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </fieldset>

              {/* password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password Is Required</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be atlest 6 characters
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be at least 6 characters long, with at least one
                  uppercase letter, one lowercase letter, and one special
                  character.
                </p>
              )}
              {/* confirm password */}
              <label className="label">Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                })}
                className="input"
                placeholder="Confirm Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Register</button>
            </fieldset>

            <Link to="/login" state={location?.state}>
              <p>
                Already Registered ?<span className="text-blue-400">Login</span>
              </p>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
