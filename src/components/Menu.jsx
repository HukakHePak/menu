import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MenuItem } from "./MenuItem";

const StyledMenu = styled.div`
  background: #b0d9e8;
  margin: auto;
  gap: 20px;
  display: flex;
  flex-direction: column;
  font-size: 28px;
  position: relative;
`;

function getElementByPosition(container, position) {
  const itemsCount = container.current.children.length;
  const itemHeight = container.current.clientHeight;
}

export function Menu(props) {
  const { list, onChange, gap, children } = props;

  const container = useRef(null);

  const [itemsPositions, setItemsPosition] = useState([]);

  useEffect(() => {
    //console.log(container.current.children);
    //console.log(children);
    // if (!itemsPositions.length)
    //   setItemsPosition(
    //     Array.from(container.current.children).map((item) => item.offsetTop)
    //   );

    //   console.log(itemsPositions);
  }, [itemsPositions]);

  function mouseMoveHandler(event) {}

  function clickHandler(event) {
    console.log(event);
  }

  function doubleClickHandler(event) {}

  return (
    <StyledMenu
    //   ref={container}
    //   onClick={clickHandler}
    //   onMouseMove={mouseMoveHandler}
    //   onDoubleClick={doubleClickHandler}
    >
      {list.map(([key, data]) => {
        return <MenuItem key={key} data={data} onDbClick onDrag />;
      })}
    </StyledMenu>
  );
}
