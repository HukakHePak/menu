import styled from "styled-components";

const StyledBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

export function Background(props) {
  const { source, style, mask } = props;

  return (
    <StyledBackground style={{ ...style, backgroundImage: `url(${source})` }}>
      {mask && mask}
    </StyledBackground>
  );
}
