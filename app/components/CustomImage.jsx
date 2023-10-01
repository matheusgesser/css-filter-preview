import React from "react";

export function CustomImage({ link, filter }) {
  const ImageStyles = {
    width: "500px",
    maxWidth: "90vw",
    height: "300px",
    maxHeight: "auto",
    backgroundImage: `url(${link})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    filter: filter,
  };

  return <div style={ImageStyles}></div>;
}
