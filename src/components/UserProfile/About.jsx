import React, { useEffect, useState } from "react";
import { Edit, Save } from "@mui/icons-material";
import { Container } from "../../Styles/About";
import { useRef } from "react";
import axios from "axios";
import { updateAbout } from "../../utils/APIRoutes";
import { toast, ToastContainer } from "react-toastify";
import { toastOptions } from "../../assets/toastOptions";
import ThreeDots from "../../assets/ThreeDots";
const About = ({ user, loggedUser }) => {
  const [about, setAbout] = useState(user.about);
  const [update, setUpdate] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const aboutRef = useRef();

  useEffect(() => {
    setAbout(user.about);
  }, [user]);

  const updateAboutHandler = async () => {
    setIsUpdating(true);
    const { data } = await axios.post(updateAbout, {
      about: aboutRef.current.value,
      id: loggedUser._id,
    });
    if (data.status === true) {
      setAbout(data.about);
    } else {
      toast.error("Some Error occured at our end", toastOptions);
    }

    setUpdate(false);
    setIsUpdating(false);
  };

  const toggleUpdateButton = () => {
    setUpdate(true);
  };

  return (
    <>
      <ToastContainer />
      <Container>
        {!isUpdating ? (
          <>
            <div className="content">
              {update ? (
                <textarea
                  className="textArea"
                  ref={aboutRef}
                  cols="90"
                  rows="5"
                  defaultValue={about}
                ></textarea>
              ) : (
                <p>{about}</p>
              )}
            </div>
            {loggedUser._id === user._id && (
              <div className="edit">
                {!update ? (
                  <Edit onClick={toggleUpdateButton} />
                ) : (
                  <Save onClick={updateAboutHandler} />
                )}
              </div>
            )}
          </>
        ) : (
          <ThreeDots />
        )}
      </Container>
    </>
  );
};

export default About;
