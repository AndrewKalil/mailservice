import styled from "styled-components";

export const FootertContainer = styled.footer`
  display: flex;

  height: 6vh;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  bottom: 0;
  position: fixed;

  @media (min-width: 768px) {
    justify-content: end;
    flex-direction: row-reverse;
    height: 6vh;
    bottom: 0;
  }
`;

export const InnerContainer = styled.div`
  /* grid grid-cols-3 grid-rows-1 text-sm md:flex justify-center items-center md:pr-16 md:text-md
 */
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 13px;
  justify-content: center;
  align-items: center;

  @media (min-width: 768px) {
    display: flex;
    padding-right: 24px;
    font-size: 15px;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    margin-right: 8px;
  }
`;
