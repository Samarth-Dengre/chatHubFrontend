import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatContainer from "../Styles/Chat";
import axios from "axios";
import Contacts from "../components/Contacts/Contacts";
import { allUsersRoute, host } from "../utils/APIRoutes";
import Welcome from "../components/Welcome";
import MessagesContainer from "../components/Messages/MessagesContainer";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";
import Loader from "../assets/loader.gif";
import {Helmet} from 'react-helmet';
const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const isAuth = useSelector((state) => state.user.isAuthenticated);
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    const setUser = async () => {
      if (!isAuth || user === null) {
        navigate("/login");
      } else {
        setIsLoaded(true);
      }
    };
    setUser();
  }, [navigate, isAuth, user]);

  useEffect(() => {
    if (user) {
      socket.current = io(host);
      socket.current.emit("add-user", user._id);
    }
  }, [user]);

  useEffect(() => {
    const fetchContacts = async () => {
      setIsLoading(true);
      const data = await axios.get(`${allUsersRoute}/${user._id}`);
      if (data.data.users !== null) setContacts(data.data.users.friends);
      setIsLoading(false);
    };
    if (user) {
      if (user.isAvatarImageSet) {
        fetchContacts();
      } else {
        navigate("/setAvatar");
      }
    }
  }, []);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
    <Helmet>
      <title>ChatHub</title>
    </Helmet>
      <NavBar />
      <ChatContainer>
        {!loading ? (
          <div className="container">
            <Contacts
              contacts={contacts}
              changeChat={handleChatChange}
            ></Contacts>
            {currentChat === undefined
              ? isLoaded && <Welcome />
              : isLoaded && (
                  <MessagesContainer
                    currentChat={currentChat}
                    currentUser={user}
                    socket={socket}
                  />
                )}
          </div>
        ) : (
          <img src={Loader} alt="Loading"></img>
        )}
      </ChatContainer>
    </>
  );
};

export default Chat;
