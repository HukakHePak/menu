import { useState } from "react";
import { Menu } from "./components/Menu";
import menu from "./menu.json";
import { StyledMenuItem } from "./styled/StyledMenuItem";
import cityImg from "./images/city.jpg";
import { StyledBgMask } from "./styled/StyledBgMask";
import { Background } from "./components/Background";

const style = {
  overflow: "hidden",
  width: "100%",
  height: "100vh",
  display: "flex",
};

function App() {
  const [list, setList] = useState(menu);

  return (
    <div className="App" style={style}>
      <Background source={cityImg} style={{ filter: "grayscale(1)" }} mask={<StyledBgMask />} />

      <Menu
        list={list}
        onChange={setList}
        style={{
          background: "rgba(43, 48, 52, 0.75)",
          border: '3px solid #fe624b',
          gap: 20,
          padding: 20,
          borderRadius: 10 /* fetch into theme */,
        }}
      >
        {({ isActive, name }) => (
          <StyledMenuItem active={isActive}> {name} </StyledMenuItem>
        )}
      </Menu>
    </div>
  );
}

export default App;
