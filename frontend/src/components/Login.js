import React, { useState, useRef } from "react";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

const Login = ({ setShowLogin, localStorage, setCurrentUser }) => {
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/login", user);

      if (res) {
        setFailure(false);
        localStorage.setItem("user", res.data.username);

        setCurrentUser(res.data.username);
        setShowLogin(false);
      }
    } catch (error) {
      setFailure(true);
    }
  };
  return (
    <div className="loginContainer">
      <div className="logo">
        <Room />
        PinOnIt
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="loginBtn">Login</button>

        {failure && (
          <span className="failure">
            Qualcosa è andato storto , riprova più tardi
          </span>
        )}
      </form>
      <Cancel className="loginCancel" onClick={() => setShowLogin(false)} />
    </div>
  );
};

export default Login;
