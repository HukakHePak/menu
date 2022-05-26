import { useState } from "react";
import menu from "./menu.json";
import { StyledMenuItem } from "./styled/StyledMenuItem";
import cityImg from "./images/city-min.jpg";
import { StyledBgMask } from "./styled/StyledBgMask";
import { Background } from "./components/Background";
import { StyledMenu } from "./styled/StyledMenu";


function App() {
  const [list, setList] = useState(menu);

  return (
    <div className="App">
      <Background
        fixed
        source={cityImg}
        style={{ filter: "grayscale(1)" }}
        mask={<StyledBgMask />}
      />
      <div style={{ height: 'fit-content', padding: 40, margin: 'auto', width: '100%' }}>
        <StyledMenu list={list} onChange={setList}>
          {({ isActive, name }) => (
            <StyledMenuItem active={isActive}> {name} </StyledMenuItem>
          )}
        </StyledMenu>
      </div>
    </div>
  );
}

export default App;
