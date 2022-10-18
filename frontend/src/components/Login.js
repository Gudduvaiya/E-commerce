import React, { useState ,useEffect} from "react";
import "./style.css";
import { Link,useNavigate } from "react-router-dom";

const Login = () => {
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate=useNavigate()
  useEffect(()=>{
    const auth=localStorage.getItem('user')
    if(auth){
        navigate('/')
    }
  })
  async function sendData() {
    let result = await fetch("http://localhost:4500/login", {
      method: "post",
      body: JSON.stringify({mail, password}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result=await result.json()
    console.log(result);
    if(result.authToken){
    localStorage.setItem("user", JSON.stringify(result.data));        //data is from backend check it.
    localStorage.setItem("auth-token", JSON.stringify(result.authToken));
        navigate('/')
    }else{
        alert('Usr not found. Please Enter correct Credentials!')
    }
  }
  return (
    <div>
      <div className="login">
        <h2>Welcome To PandaKart</h2>
        <h3>Please Logged in yourself to continue</h3>
        <div className="signup-form">
          <input
            type="email"
            placeholder="Enter Your E-Mail "
            value={mail}
            onChange={(e) => {
              setmail(e.target.value);
            }}
          />

          <input
            type="Password"
            placeholder="Enter Your Password "
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />

          <button className="submitbtn" onClick={sendData}>
            Log In
          </button>
          <p>
            Don't have an account? Then{" "}
            <span style={{ color: "blue", cursor: "pointer" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Sign up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
