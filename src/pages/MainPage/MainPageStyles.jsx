import styled from "styled-components";

export const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  gap: 0px;
`;

export const MainDiv = styled.div`
  width: 100%;
  height: 80%;
  border: 1px solid #dce6e6;
  border-radius: 0px 0px 10px 10px;
  padding: 2rem 3rem;
  border-top: 0px;
  border-color: #dce6e6;
`;

export const TabButtons = styled.nav`
  margin-top: 4rem;
  display: flex;
  width: 100%;
  justify-content: start;
`;

export const TabButton = styled.button`
  /* py-2 w-full focus:outline-none rounded-t-lg font-title text-md text-lavanda  */
  padding: ${(props) => props.isActive && `10px 0`};
  width: 100%;
  background-color: ${(props) => (props.isActive ? "#FFFFFF " : "transparent")};
  border-width: ${(props) =>
    props.isActive ? "1px 1px 0px 1px" : "0px 0px 1px 0px"};
  margin-top: ${(props) => (props.isActive ? "-1rem" : "")};
  border-color: #dce6e6;
  border-radius: 7px 7px 0 0;
  color: #3c6ebe;
  font-weight: 600;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: white;
  }

  &:focus {
    outline: none;
  }

  @media (max-width: 640px) {
    font-size: 0.65rem;
    padding: 2px;
  }

  @media (max-width: 768px) {
    font-size: 0.775rem;
    padding: 5px;
  }
`;
