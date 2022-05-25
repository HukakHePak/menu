import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import menu from "./menu.json";
import { StyledMenuItem } from "./styled/StyledMenuItem";

function App() {
  const [list, setList] = useState(menu);

  return (
    <div className="App">
      <Menu list={list} onChange={setList}>
        {({ isActive, name }) => (
          <StyledMenuItem active={isActive}> {name} </StyledMenuItem>
        )}
      </Menu>
    </div>
  );
}

export default App;
