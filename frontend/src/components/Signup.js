import React, { useState ,useEffect} from "react";
import { useNavigate,Link } from "react-router-dom";
const Signup = () => {
  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [ph, setph] = useState();
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  // function forwhen user signed in terminate routing to signup 
  useEffect(()=>{
    let auth=localStorage.getItem('user');
    if(auth){
        navigate('/')
    }
  })

  //connecting with backend
  const sendData = async () => {
    let result = await fetch("http://localhost:4500/signup", {
      method: "post",
      body: JSON.stringify({ name, mail, ph, password }),
      headers: { "Content-Type": "application/json" },
    });
    result = await result.json();
    console.log(result);
    localStorage.setItem("user", JSON.stringify(result.result));      //the second result is coming from backend check it
    localStorage.setItem("auth-token", JSON.stringify(result.authToken));
    navigate("/");
  };
  return (
    <div className="signup">
      <h2>Welcome To PandaKart</h2>
      <h3>Please Register yourself to continue</h3>
      <div className="signup-form">
        <input
          type="text"
          placeholder="Enter Your Name "
          value={name}
          onChange={(e) => {
            setname(e.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Enter Your E-Mail "
          value={mail}
          onChange={(e) => {
            setmail(e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Enter Your Contact Number "
          value={ph}
          onChange={(e) => {
            setph(e.target.value);
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
        <input type="text" placeholder="Confirm Your Password " />
        <button className="submitbtn" onClick={sendData}>
          Submit
        </button>
        <p>
          Already have an account? Then{" "}
          <span style={{ color: "blue", cursor: "pointer" }}><Link to='/login' style={{textDecoration:"none"}}>Log In</Link></span>
        </p>
      </div>
    </div>
  );
};
export default Signup;
