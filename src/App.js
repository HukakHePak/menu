import { useState } from "react";
import "./App.css";
import { Menu } from "./components/Menu";
import menu from './menu.json';

function App() {
  const [list, setList] = useState(menu);

  return <div className="App">
    <Menu list={list} onChange={setList}></Menu>
  </div>;
}

export default App;
