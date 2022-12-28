import FormContainer from "../Styles/FormContainer";
import Logo from "../assets/logo.svg";
// import { ToastContainer, toast } from "react-toastify";
// import { toastOptions } from "../assets/toastOptions";
import Input from "../assets/Input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Email } from "@mui/icons-material";
const ForgotPassword = () => {
  const [values, setValues] = useState({
    code: "",
    email: "",
  });

  const [codeSent, setCodeSent] = useState(false);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const { email, code } = values;
    if (!codeSent) {
    } else {
    }
  };

  return (
    <FormContainer>
      <form onSubmit={submitHandler}>
        <div className="brand">
          <img src={Logo} alt="LOGO"></img>
          <h1>Chathub</h1>
        </div>
        <Input
          type="email"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => handleChange(e)}
        />
        <button type="submit">
          {!codeSent ? "Send Code" : "Reset Password"}
        </button>
        <span
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "0.9rem",
          }}
        >
          <NavLink to="/login">Login</NavLink>
        </span>
      </form>
    </FormContainer>
  );
};

export default ForgotPassword;
