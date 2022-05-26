import styled from "styled-components";

export const StyledMenuItem = styled.div`
  font-size: 36px;
  padding: 20px;
  width: 300px;
  text-align: center;
  color: ${props => props.active ? 'white' : '#515659'};
  background: ${props => props.active ? '#fe624b' : '#34393f'};
  border-radius: 10px;
  transition: 0.1s;
  
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  }
`;
