import styled from "styled-components";
import { Menu } from "../components/Menu";

export const StyledMenu = styled(Menu)`
    background: rgba(43, 48, 52, 0.75);
    border: 3px solid #fe624b;
    gap: 20px;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    margin: auto;
    
    @media(max-width: 768px) {
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 0;
        background: transparent;
    }
`;
