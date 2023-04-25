import { useContext, useState } from "react";
import "./login.css";
import loginImage from "../../assests/login-animation.gif";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { BiShow, BiHide } from "react-icons/bi";
import { AuthContext } from "../../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Login = () => {
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navitage = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };
  const handleShowPassword = () => {
    setShowPassword((preve) => !preve);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.email !== "" &&
      data.password !== "" &&
      data.email === "admin@unlock.com"
    ) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          dispatch({ type: "LOGIN", payload: user });
          toast.success("Logged In!");
          navitage("/");
        })
        .catch((error) => {
          setError(true);
          toast.error(error.message);
        });
    } else {
      toast.error("Please fill details correctly!");
      console.log("Please fill details correctly!");
    }
  };

  return (
    <div className="p-3 md:p-4 flex flex-col justify-center items-center">
      <ToastContainer />
      <div className="w-full max-w-sm bg-white m-auto flex flex-col justify-center items-center  p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginImage} alt="avatar" className="w-full" />
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none "
              value={data.password}
              onChange={handleOnChange}
            />
            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto  bg-red-500 hover:bg-red-600 cursor-pointer  text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Login
          </button>
        </form>
        {error && <span>Wrong email or password!</span>}
      </div>
    </div>
  );
};

export default Login;
