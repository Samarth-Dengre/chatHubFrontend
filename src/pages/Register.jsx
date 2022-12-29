import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { toastOptions } from "../assets/toastOptions";
import { NavLink, useNavigate } from "react-router-dom";
import FormContainer from "../Styles/FormContainer";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerRoute } from "../utils/APIRoutes";
import Input from "../assets/Input";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../store/user-slice";
import ThreeDots from "../assets/ThreeDots";
import { Helmet } from "react-helmet";
import { verifyEmailForRegistration } from "../utils/APIRoutes";
export default function Register() {
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    code: "",
  });
  const [codeId, setCodeId] = useState("");

  const [registering, setRegestering] = useState(false);
  const [mailSent, setMailSent] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user.isAuthenticated);
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (handleValidation()) {
        const { password, username, email, code } = values;
        setMailSent(true);
        if (!mailSent) {
          const emailVerification = await axios.post(
            verifyEmailForRegistration,
            {
              email,
              username,
            }
          );
          if (!emailVerification.data.status) {
            toast.error(emailVerification.data.msg, toastOptions);
            return;
          } else {
            setCodeId(emailVerification.data.codeId);
            toast.success(emailVerification.data.msg, toastOptions);
          }
        } else {
          setRegestering(true);
          const { data } = await axios.post(registerRoute, {
            username,
            email,
            password,
            codeId,
            code,
          });
          setRegestering(false);
          setMailSent(false);
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
            return;
          }
          if (data.status === true) {
            dispatch(
              userActions.setUser({
                user: data.user,
                isAuthenticated: true,
              })
            );
            navigate("/setAvatar");
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", toastOptions);
      setRegestering(false);
    }
  };

  const handleValidation = useCallback(() => {
    const { password, confirmPassword, username, email } = values;
    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is empty!!!", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error(
        "Password should be greater than or equal to 8 characters",
        toastOptions
      );
      return false;
    } else if (password !== confirmPassword) {
      toast.error("password and confirm password should be same", toastOptions);
      console.log(password, confirmPassword);
      return false;
    }

    return true;
  }, [values]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>ChatHub | Register</title>
      </Helmet>
      <FormContainer>
        <form onSubmit={submitHandler}>
          <div className="brand">
            <img src={Logo} alt="LOGO"></img>
            <h1>ChatHub</h1>
          </div>
          <Input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <Input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />
          {mailSent && (
            <Input
              type="text"
              placeholder="Enter the code sent to your email"
              name="code"
              onChange={(e) => handleChange(e)}
            />
          )}
          <button type="submit">
            {!mailSent ? (
              <p>Verify Email</p>
            ) : !registering ? (
              <p>Create User</p>
            ) : (
              <ThreeDots />
            )}
          </button>
          <span>
            Already have an account ? <NavLink to="/login">Login</NavLink>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </React.Fragment>
  );
}
