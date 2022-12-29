import FormContainer from "../Styles/FormContainer";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../assets/toastOptions";
import Input from "../assets/Input";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { resetPassword, verifyEmailForResetPassword } from "../utils/APIRoutes";
import axios from "axios";
const ForgotPassword = () => {
  const [values, setValues] = useState({
    code: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [codeSent, setCodeSent] = useState(false);
  const [codeId, setCodeId] = useState("");
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const { password, confirmPassword } = values;
    if (password.length === 0) {
      toast.error("Password cannot be empty", toastOptions);
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be atleast 8 characters long", toastOptions);
      return false;
    } else if (confirmPassword.length === 0) {
      toast.error("Confirm Password cannot be empty", toastOptions);
      return false;
    }

    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const { email, code, password } = values;
    if (email.length === 0) {
      toast.error("Email cannot be empty", toastOptions);
      return;
    }
    try {
      if (!codeSent) {
        const { data } = await axios.post(verifyEmailForResetPassword, {
          email,
        });
        if (data.status) {
          setCodeSent(true);
          setCodeId(data.codeId);
          toast.success(data.msg, toastOptions);
        } else if (!data.status) {
          toast.error(data.msg, toastOptions);
          setCodeId("");
        }
      } else {
        if (validate()) {
          const { data } = await axios.post(resetPassword, {
            email,
            codeId,
            code,
            password,
          });

          if (data.status) {
            toast.success(data.msg, toastOptions);
          } else if (!data.status) {
            toast.error(data.msg, toastOptions);
          }
          setCodeId("");
          setCodeSent(false);
          setValues({
            code: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Some error occured while sending mail", toastOptions);
      setCodeId("");
    }
  };

  return (
    <>
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
          {codeSent && (
            <>
              <Input
                type="text"
                placeholder="Enter the code sent to your email"
                name="code"
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="password"
                placeholder="Enter new password"
                name="password"
                onChange={(e) => handleChange(e)}
              />
              <Input
                type="password"
                placeholder="Confirm new password"
                name="confirmPassword"
                onChange={(e) => handleChange(e)}
              />
            </>
          )}
          <button type="submit">
            {!codeSent ? "Send Code" : "Reset Password"}
          </button>
          <span>
            Back to <NavLink to="/login"> Login</NavLink>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
};

export default ForgotPassword;
