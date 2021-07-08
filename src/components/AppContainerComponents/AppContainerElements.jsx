import styled from "styled-components";

export const AppContainer = styled.main`
  width: 100%;
  height: 100vh;
`;

export const AppInnerContainer = styled.div`
  /* padding-top: 8vh; */
  /* width: 100%; */
  height: 86vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: auto;
  margin-right: auto;
  /* text-align: center;
  text-justify: center; */

  @media (min-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 640px) {
    width: 95%;
    padding-right: 1rem;
    padding-left: 1rem;
    font-size: 14px;
  }
`;
