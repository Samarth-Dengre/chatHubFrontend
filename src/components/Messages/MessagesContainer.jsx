import React, { useEffect, useRef, useState } from "react";
import { Container } from "../../Styles/MessagesContainer";
import ChatInput from "../Chat/ChatInput";
import axios from "axios";
import { getAllMessagesRoute, sendMessageRoute } from "../../utils/APIRoutes";
import { useNavigate } from "react-router-dom";
import Loader from "../../assets/chatLoad.gif";
import { ToastContainer, toast } from "react-toastify";
import { toastOptions } from "../../assets/toastOptions";

const MessagesContainer = (props) => {
  const { currentChat, currentUser, socket } = props;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [chatIsLoading, setChatIsLoading] = useState(false);
  const scrollRef = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    setChatIsLoading(true);
    const fetchChat = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });
      setMessages(response.data);
      setChatIsLoading(false);
    };
    fetchChat();
  }, [currentChat._id]);

  const handleSendMessage = async (msg) => {
    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
    const { data } = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    if (!data.status) {
      toast.error(data.msg, toastOptions);
    }

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        if (msg.from === currentChat._id) {
          setArrivalMessage({
            fromSelf: false,
            message: msg.msg,
            from: msg.from,
          });
        }
      });
    }
  }, [socket, currentChat._id]);

  useEffect(() => {
    if (arrivalMessage !== null && arrivalMessage.from === currentChat._id) {
      setMessages((prev) => [...prev, arrivalMessage]);
      setArrivalMessage(null);
    }
  }, [arrivalMessage, currentChat._id]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  const viewSelectedUserProfile = (id) => {
    return () => {
      navigate(`/users/id=${id}`);
    };
  };

  return (
    currentChat && (
      <>
        <Container>
          <div className="chat-header">
            <div className="user-details">
              <div className="avatar">
                <img
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt="avatar"
                ></img>
              </div>
              <div className="username">
                <h3>{currentChat.username}</h3>
              </div>
            </div>
            <button onClick={viewSelectedUserProfile(currentChat._id)}>
              View Profile
            </button>
          </div>
          <div className="chat-messages">
            {!chatIsLoading ? (
              messages.map((message, index) => {
                return (
                  <div ref={scrollRef} key={index}>
                    <div
                      className={`message ${
                        message.fromSelf ? "sent" : "recieved"
                      }`}
                    >
                      <div className="content">
                        <p>{message.message}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <img src={Loader} alt="Loading" className="Loader"></img>
            )}
          </div>
          {!chatIsLoading && (
            <ChatInput handleSendMessage={handleSendMessage} />
          )}
          <ToastContainer />
        </Container>
      </>
    )
  );
};

export default MessagesContainer;
