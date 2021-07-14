import styled from "styled-components";
import { IoMdAddCircle, IoMdAddCircleOutline } from "react-icons/io";

export const Button = styled.button`
  border: ${(props) =>
    props.bg ? `1px solid ${props.bg}` : "1px solid #3948ff"};
  color: ${(props) => (props.bg ? props.bg : "#3948ff")};
  padding: 8px;
  border-radius: 6px;
  background-color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3px;
  margin-top: ${(props) => props.marginTop && props.marginTop};
  /* width: ${(props) => (props.w ? props.w : "100px")}; */

  &:hover {
    background-color: ${(props) => (props.bg ? props.bg : "#3948ff")};
    color: white;
  }

  &:focus {
    outline: none;
  }
`;

export const AddIconNoFill = styled(IoMdAddCircleOutline)`
  color: #3948ff;
  font-size: 18px;
`;

export const AddIconFill = styled(IoMdAddCircle)`
  color: #3948ff;
  font-size: 18px;
`;

export const ModalButtons = styled.button`
  border-radius: 6px;
  border: 1px solid;
  border-color: ${(props) => (props.bg ? props.bg : "#787878")};
  height: 45px;
  width: 175px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.bg ? props.bg : "transparent")};
  color: ${(props) => (props.bg ? "white" : "#787878")};
  outline: none;
  cursor: pointer;
`;
