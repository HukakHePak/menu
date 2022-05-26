import styled from "styled-components";

const StyledBackground = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-repeat: no-repeat;
`;

export function Background(props) {
  const { source, style, mask, fixed } = props;

  return (
    <StyledBackground
      style={{
        ...style,
        backgroundImage: `url(${source})`,
        position: fixed ? "fixed" : "absolute",
      }}
    >
      {mask && mask}
    </StyledBackground>
  );
}
