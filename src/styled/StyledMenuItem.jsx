import styled from "styled-components";

export const StyledMenuItem = styled.div`
  font-size: 36px;
  box-sizing: border-box;
  padding: 20px;
  width: 100%;
  height: 100%;
  color: ${props => props.active ? '#34393f' : '#515659'};
  background: ${props => props.active ? '#fe624b' : '#34393f'};
  border-radius: 10px;
  transition: 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  } 
`;
