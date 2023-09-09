import  { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const SignIn = () => {

  const [formData, setFormData] = useState({});
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(false);

  const {loading, error} = useSelector((state)=> state.user)
  console.log(loading,error);

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);

      if(data.success === false){
        console.log(data);
        dispatch(signInFailure(data))        
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailure(error))

    }
  };
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      
        <input
          type="text"
          placeholder="Email"
          id="email"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-100 p-3 rounded-lg"
          onChange={handleChange}
        />
        <button disabled={loading} className= "bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading ......" : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-500">Sign Up</span>
        </Link>
      </div>
      <div>
        <p className="text-red-700 mt-5">{error ? error.message  || "Something went wrong":""}</p>
      </div>
    </div>
  );
};

export default SignIn;
