import { Link } from "react-router-dom";
import styled from "styled-components";

export const Tab1Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export const ConfigurationsContainer = styled.div`
  width: 100%;
  flex-grow: 1;
  padding-bottom: 2rem;
`;

export const EmailsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 13px;
  flex-grow: 1;
`;

export const LogsBtn = styled(Link)`
  text-decoration: underline;
  color: #3948ff;
  position: ${(props) => props.absolute && "absolute"};
  right: ${(props) => props.absolute && "0"};
  top: ${(props) => props.absolute && "-10px"};
  font-size: 12px;
`;

export const EmailContainer = styled.div`
  border: 1px solid #dce6e6;
  border-radius: 10px;
  min-height: 200px;
  width: 100%;
  display: flex;
  background: ${(props) => props.edit && "#f5faff"};
  flex-direction: column;

  @media (min-width: 768px) {
    min-height: 200px;
  }

  &:hover {
    background: #f5faff;
    border-color: transparent;
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
  gap: 15px;
  position: ${(props) => props.absolute && "absolute"};
  top: ${(props) => props.absolute && "0"};
  left: ${(props) => props.absolute && "5px"};
`;

export const OptionButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

export const EmailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  grid-gap: 8%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }
`;

export const InputFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 0px 15px 15px 10px;
`;

export const InputField = styled.div`
  display: grid;
  grid-template-columns: 18% auto;
  gap: 10px;
  align-items: center;
  /* height: ${(props) => props.switch && "25px"}; */

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 18% auto;
    gap: 7px;
    align-items: center;
  }
`;

export const Input = styled.input`
  flex-grow: 1;
  background: #ffffff;
  border: 1px solid #dce6e6;
  border-radius: 6px;
  height: ${(props) => (props.height ? props.height : "35px")};
  outline: none;
  padding: 0 10px;
`;

export const InputShow = styled.div`
  flex-grow: 1;
  height: 35px;
  padding: 0 10px;
  background: inherit;
  border: 0;
  align-items: center;
  display: flex;
  border: 1px solid transparent;
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: black; */
  padding-top: 1%;
  padding-left: 5%;
  padding-right: 5%;
  display: ${(props) => props.spaceBetween && "flex"};
  justify-content: ${(props) => props.spaceBetween && "space-between"};
  align-items: ${(props) => props.spaceBetween && "center"};
  flex-direction: ${(props) => props.spaceBetween && "column"};
`;

export const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Logs = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 15px;
`;

export const LogContainer = styled.div`
  width: 100%;
  height: 145px;
  border: 1px solid #dce6e6;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

export const LogBody = styled.div`
  display: flex;
  flex-grow: 1;
  gap: 20px;
`;

export const Photo = styled.div`
  width: 40px;
  height: 100%;

  @media (min-width: 768px) {
    width: 45px;
  }

  @media (min-width: 1024px) {
    width: 50px;
  }
`;

export const LogInfo = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  /* background-color: green; */
  justify-content: center;
`;

export const Reglas = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 15px;
`;

export const ReglaContainer = styled.div`
  width: 100%;
  min-height: 230px;
  border: 1px solid #dce6e6;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  padding: 2rem 6rem 2rem 6rem;
  justify-content: space-between;
  position: relative;
`;

export const ReglasInputField = styled.div`
  display: grid;
  grid-template-columns: 40% auto;
  gap: 10px;
  align-items: center;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 18% auto;
    gap: 7px;
    align-items: center;
  }
`;

export const CheckInput = styled.div`
  height: 15px;
  width: 15px;
  border: 1px solid #3948ff;
  border-radius: 50%;
  cursor: pointer;
  position: relative;

  &:after {
    content: "";
    background-color: ${(props) => (props.checked ? "#3948FF" : "inherit")};
    /* margin: 1px; */
    border-radius: 50%;
    position: absolute;
    height: 11px;
    width: 11px;
    top: 1px;
    right: 1px;
  }
`;

export const PartialOptionsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
`;
