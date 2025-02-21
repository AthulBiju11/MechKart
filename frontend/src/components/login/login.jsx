import { React, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import Styles from "../../styles/style.js";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest.js";
import {toast} from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  // const [error, setError] = useState(null);
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("/auth/login", { username, password });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/");
    } catch (err) {
      toast.error(err.response.data, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min h-screen bg-[#FCF5FE] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-[#682A85]">
          Login to your account
        </h2>
      </div>

      {/* the outer box container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <form className="space-y-6 " onSubmit={handleSubmit}>
            {/* email address textfield */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-grey-700"
              >
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="username"
                  autoComplete="email"
                  required
                  
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-[#] focus:border-[#682A85] sm:text-sm"
                />
              </div>
            </div>
            {/* email address textfield */}
            {/* password text field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-grey-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-grey-300 rounded-md shadow-sm placeholder-grey-400 focus:outline-none focus:ring-[#682A85] focus:border-[#682A85] sm:text-sm"
                />

                {visible ? (
                  <AiOutlineEye
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <AiOutlineEyeInvisible
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            {/* password text field */}

            {/* Remember me with checkbox*/}
            <div className={`${Styles.normalFlex} justify-between`}>
              <div className={`${Styles.normalFlex} h-1`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-grey-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2  text-sm text-grey-900"
                >
                  Remember me
                </label>
              </div>
              {/* Remember me */}

              {/* forget password  */}
              <div className="text-sm mb-9">
                <a
                  href="forgot-password"
                  className="float-right font-medium text-blue-600 hover:text-blue-500"
                >
                  Forgot your password?
                </a>
              </div>
              {/* forget password  */}
            </div>{" "}
            {/*end of remember me */}
            {/*submit button */}
            <div>
              <button
                type="submit"
                className="group relative w-full h-[40px] justify-center py-2 px-4 border-transparent text-sm font-medium rounded-md text-white bg-[#682A85] hover:bg-[#983ec2] "
              >
                Submit
              </button>
            </div>
            {/*submit button */}
            {/*signup button */}
            <div className={`${Styles.normalFlex} w-full flex `}>
              <h4 className="text-sm">Not have any account?</h4>
              <Link
                to="/signup"
                className="text-blue-600 hover:text-blue-500 text-sm font-semibold mx-2"
              >
                <p className="hover:underline">Sign up</p>
              </Link>
            </div>
            {/*signup button */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


