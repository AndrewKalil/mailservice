import React from "react";
import Scrollbars from "react-custom-scrollbars";

export const Scrollbar = (props) => {
  const preventDefault = (e) => {
    e = e || window.event;
    if (e.preventDefault) {
      e.preventDefault();
    }
    e.returnValue = false;
  };

  const enableScroll = () => {
    document.removeEventListener("wheel", preventDefault, false);
  };

  const disableScroll = () => {
    document.addEventListener("wheel", preventDefault, {
      passive: false,
    });
  };

  return (
    <Scrollbars
      style={{
        width: "100%",
        height: props.height ? props.height : "24rem",
        padding: "10px",
      }}
      autoHide
      onMouseEnter={() => disableScroll}
      onMouseLeave={() => enableScroll}
    >
      {props.children}
    </Scrollbars>
  );
};
