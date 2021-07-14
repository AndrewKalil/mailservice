import styled, { keyframes } from "styled-components";
const BounceAnimation = keyframes`
  0% { margin-bottom: 0; }
  50% { margin-bottom: 15px }
  100% { margin-bottom: 0 }
`;
export const DotWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => (props.mTop ? props.mTop : "150px")};
`;
export const Dot = styled.div`
  background-color: #3c6ebe;
  border-radius: 50%;
  width: 10px;
  height: 10px;
  margin: 0 5px; /* Animation */
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Loader = ({ mTop }) => {
  return (
    <Container>
      <DotWrapper mTop={mTop}>
        <Dot delay="0s" />
        <Dot delay=".1s" />
        <Dot delay=".2s" />
      </DotWrapper>
    </Container>
  );
};
