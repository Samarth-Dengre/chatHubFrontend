import React from "react";
import { SwapHoriz } from "@mui/icons-material";
const UpperHalf = ({ user, loggedUser, changeAvatarHandler }) => {
  return (
    <div className="upper-half">
      <div className="avatar-image">
        <img
          src={`data:image/svg+xml;base64,${user.avatarImage}`}
          alt="avatar"
        />
        {loggedUser._id === user._id && (
          <SwapHoriz className="Change-Profile" onClick={changeAvatarHandler} />
        )}
      </div>
      <div className="user-details">
        <p>Name: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default UpperHalf;
