import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import { MenuItem } from "./components/MenuItem";
import menu from './menu.json';

function App() {
  const [list, setList] = useState(menu);

  const elem = <MenuItem />;

  //console.log(elem.type())

  return <div className="App">
    <Menu list={list} onChange={setList}> { item => <MenuItem data={item}/>} </Menu>
  </div>;
}

export default App;
