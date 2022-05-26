import styled from "styled-components";

export const StyledMenuItem = styled.div`
  font-size: 36px;
  padding: 20px;
  width: 300px;
  text-align: center;
  color: white;
  background: #fe624b;
  border-radius: 10px;
  transition: 0.1s;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  }
`;
