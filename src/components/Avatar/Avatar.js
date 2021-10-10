import React from "react";

function Avatar({ user, size }) {
  const avatarStyle = {
    width: `${size}px`,
    height: `${size}px`,
    verticalAlign: "middle",
    borderRadius: "3px",
    backgroundColor: "white",
  };
  return (
    <div style={{ display: "inline" }}>
      <img
        src={`https://avatars.dicebear.com/api/micah/${user.id}.svg`}
        alt=""
        style={avatarStyle}
      />
    </div>
  );
}

export default Avatar;
