import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  addFriendRoute,
  getUserDetails,
  updateUserProfile,
} from "../utils/APIRoutes";
import Loader from "../assets/loader.gif";
import { Container } from "../Styles/UserProfile";
import NavBar from "../components/NavBar";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../assets/toastOptions";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import About from "../components/UserProfile/About";
import UpperHalf from "../components/UserProfile/UpperHalf";
import ThreeDots from "../assets/ThreeDots";
import { Helmet } from "react-helmet";
import {DeleteForever} from '@mui/icons-material';
import { deleteAccount } from "../utils/APIRoutes";
import { useDispatch } from "react-redux";
import { userActions } from "../store/user-slice";

function UserProfile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const loggedUser = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [enableInputFields, setEnableInputFields] = useState(false);
  const workRef = useRef();
  const linkedInRef = useRef();
  const githubRef = useRef();
  const twitterRef = useRef();
  const [isUpdating, setIsUpdating] = useState(false);
  const [sendingRequest, setSendingRequest] = useState(false);

  const changeAvatarHandler = () => {
    navigate("/setAvatar");
  };

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(`${getUserDetails}/${id}`);
      if (data.status === true) {
        setUser(data.user);
      } else {
        // Error Page
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [id]);

  const addFriendHandler = (id) => {
    return async () => {
      setSendingRequest(true);
      const { data } = await axios.get(
        `${addFriendRoute}/?fromId=${loggedUser._id}&toId=${id}`
      );
      setSendingRequest(false);
      if (data.status === true) {
        toast.success(`New Friend Added`, toastOptions);
      } else if (data.status === false && data.isFriend === true) {
        toast.error(data.msg, toastOptions);
      }
    };
  };

  const updateProfileHandler = (event) => {
    event.preventDefault();
    setEnableInputFields(true);
  };

  const saveProfileChangesHandler = async (event) => {
    event.preventDefault();
    if (enableInputFields) {
      setIsUpdating(true);
      const { data } = await axios.post(updateUserProfile, {
        workEmail: workRef.current.value,
        linkedin: linkedInRef.current.value,
        github: githubRef.current.value,
        twitter: twitterRef.current.value,
        id: loggedUser._id,
      });

      if (data.status === true) {
        toast.success(
          "UPDATED, Please refresh the page to view changes",
          toastOptions
        );
      } else {
        toast.error("Failed To Update", toastOptions);
      }
      setIsUpdating(false);
    }
    setEnableInputFields(false);
  };

  const deleteAccounthandler = async() => {
    const {data} = await axios.delete(`${deleteAccount}/${loggedUser._id}`);
    if(data.status === true){
      toast.success("Account Deleted", toastOptions);
      localStorage.clear();
      dispatch(
        userActions.setUser({
          user: null,
          isAuthenticated: false,
        })
      );
      navigate("/login");
    }else{
      toast.error("Failed To Delete Account", toastOptions);
    }
  };

  return (
    <>
      <Helmet>
        <title>ChatHub | Profile</title>
      </Helmet>
      <ToastContainer />
      <NavBar />
      {isLoading ? (
        <Container>
          <img src={Loader} alt="Please Wait" className="loader" />
        </Container>
      ) : (
        <>
          <Container>
            <UpperHalf
              user={user}
              changeAvatarHandler={changeAvatarHandler}
              loggedUser={loggedUser}
            />

            <About user={user} loggedUser={loggedUser} />

            <div className="lower-half">
              {!isUpdating ? (
                <form onSubmit={saveProfileChangesHandler}>
                  <div className="contact-details">
                    <p>
                      Work email:{" "}
                      {enableInputFields ? (
                        <input
                          type="email"
                          placeholder="Enter your work email"
                          name="work_email"
                          defaultValue={user.socialMedia.work_email}
                          ref={workRef}
                        ></input>
                      ) : (
                        user.socialMedia.work_email
                      )}
                    </p>
                    <p>
                      Github:{" "}
                      {enableInputFields ? (
                        <input
                          type="text"
                          placeholder="Enter your github profile url"
                          name="github"
                          defaultValue={user.socialMedia.github}
                          ref={githubRef}
                        ></input>
                      ) : (
                        user.socialMedia.github
                      )}
                    </p>
                    <p>
                      LinkedIn:{" "}
                      {enableInputFields ? (
                        <input
                          type="text"
                          placeholder="Enter your linkedin profile url"
                          name="linkedin"
                          defaultValue={user.socialMedia.linkedin}
                          ref={linkedInRef}
                        ></input>
                      ) : (
                        user.socialMedia.linkedin
                      )}
                    </p>
                    <p>
                      Twitter:{" "}
                      {enableInputFields ? (
                        <input
                          type="text"
                          placeholder="Enter your twitter handle url"
                          name="twitter"
                          defaultValue={user.socialMedia.twitter}
                          ref={twitterRef}
                        ></input>
                      ) : (
                        user.socialMedia.twitter
                      )}
                    </p>
                    {loggedUser._id !== user._id && (
                      <button onClick={addFriendHandler(user._id)}>
                        {sendingRequest ? (
                          <ThreeDots />
                        ) : (
                          <span>Add Friend</span>
                        )}
                      </button>
                    )}
                    {loggedUser._id === user._id &&
                      (enableInputFields ? (
                        <button type="submit">Save Changes</button>
                      ) : (
                        <button onClick={updateProfileHandler}>
                          Update Profile
                        </button>
                      ))}
                  </div>
                </form>
              ) : (
                <ThreeDots />
              )}
            </div>
            <button className="deleteAccount" onClick={deleteAccounthandler}>
              Delete Account <DeleteForever />
            </button>
          </Container>
        </>
      )}
    </>
  );
}

export default UserProfile;
