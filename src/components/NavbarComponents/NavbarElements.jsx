import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  background-color: white;
  box-shadow: 2px 1px 8px rgba(138, 167, 196, 0.5);
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  height: 8vh;

  @media (min-width: 1024px) {
    /* width: 80%; */
    height: 52px;
  }
`;

export const NavbarStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
  width: 90%;
  position: relative;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }

  /* @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 50% 50%;
    align-items: center;
    width: 85%;
  } */

  @media (min-width: 1024px) {
    width: 80%;
    min-height: 52px;
  }
`;

export const NavLogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const NavLogo = styled(NavLink)`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    width: 40%;
  }

  @media (min-width: 768px) {
    width: 35%;
  }

  @media (min-width: 1536px) {
    width: 135px;
  }
`;

export const ProfileSquare = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media (min-width: 768px) {
    border-left-width: 2px;
    padding-left: 2rem;
  }
`;

export const ProfileGrid = styled.div`
  display: grid;
  grid-template-columns: 73% 25%;
  width: 100%;
  height: 100%;
  grid-gap: 2%;

  @media (max-width: 768px) {
    grid-template-columns: 85% 15%;
    width: 60%;
  }
`;

export const ProfileText = styled.p`
  font-size: 12px;
  font-weight: ${(props) => props.title && "600"};
  color: ${(props) => props.color && props.color};

  @media (min-width: 768px) {
    font-size: 12px;
  }

  @media (min-width: 1024px) {
    font-size: 13px;
  }
`;

export const MailService = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    display: none;
  }
`;
