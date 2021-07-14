import React, { Component } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { GrClose } from "react-icons/gr";

const portalRoot = document.getElementById("portal");

class Popup extends Component {
  constructor() {
    super();
    this.element = document.createElement("div");
  }

  componentDidMount = () => {
    portalRoot.appendChild(this.element);
  };

  componentWillUnmount = () => {
    portalRoot.removeChild(this.element);
  };

  render() {
    const { children } = this.props;

    return ReactDOM.createPortal(children, this.element);
  }
}

// style for popup
const PopupStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PopupWindow = styled.div`
  position: fixed;
  background-color: #ffffff;
  border-radius: 5px;
  padding: 13px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  width: 95%;
  height: ${(props) => (props.height ? props.height : "80%")};
  transition: 0.5s ease-in-out;

  @media (min-width: 1280px) {
    width: 65%;
    height: ${(props) => (props.height ? props.height : "75%")};
  }

  @media (min-width: 1024px) {
    width: 60%;
    height: ${(props) => (props.height ? props.height : "75%")};
  }

  @media (min-width: 768px) {
    width: 75%;
    height: ${(props) => (props.height ? props.height : "75%")};
  }
`;

const Background = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0px;
  background: black;
  opacity: 0.5;
  z-index: 999;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

// const CloseButtonFill = styled(IoMdCloseCircle)`
//   font-size: 25px;
//   width: 100%;
//   height: 100%;
// `;

// const CloseButton = styled(IoMdCloseCircleOutline)`
//   font-size: 25px;
//   width: 100%;
//   height: 100%;
// `;

const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  border-width: 0px;
  background-color: transparent;

  &:focus {
    outline: none;
  }
`;

export const Modal = (props) => {
  const { children, setModalActive, active, height } = props;
  return (
    <Popup>
      {active && (
        <PopupStyle>
          <PopupWindow height={height}>
            <div style={{ position: "relative" }}>
              <Button
                onClick={() => {
                  setModalActive(false);
                }}
              >
                <GrClose />
              </Button>
            </div>
            <Content>{children}</Content>
          </PopupWindow>
          <Background onClick={() => setModalActive(false)}></Background>
        </PopupStyle>
      )}
    </Popup>
  );
};
