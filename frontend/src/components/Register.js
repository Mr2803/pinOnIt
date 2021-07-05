import React, { useState, useRef } from "react";
import { Room, Cancel } from "@material-ui/icons";
import axios from "axios";

const Register = ({ setShowRegister, localStorage, setCurrentUser }) => {
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value.toLowerCase(),
      email: emailRef.current.value.toLowerCase(),
      password: passwordRef.current.value,
    };
    try {
      const res = await axios.post("/users/register", newUser);
      if (res) {
        setFailure(false);
        setSuccess(true);
        localStorage.setItem("user", res.data.username);
        setCurrentUser(res.data.username);
        setShowRegister(false);
      }
    } catch (error) {
      setFailure(true);
    }
  };
  return (
    <div className="registerContainer">
      <div className="logo">
        <Room />
        PinOnIt
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="registerBtn">Register</button>
        {success && (
          <span className="success">Perfetto , ora sei loggato !</span>
        )}
        {failure && (
          <span className="failure">
            Qualcosa è andato storto , riprova più tardi
          </span>
        )}
      </form>
      <Cancel
        className="registerCancel"
        onClick={() => setShowRegister(false)}
      />
    </div>
  );
};

export default Register;
