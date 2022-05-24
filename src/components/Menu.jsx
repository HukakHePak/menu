import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { MenuItem } from "./MenuItem";

const StyledMenu = styled.div`
  background: #b0d9e8;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  word-wrap: break-word;

  & > div {
    cursor: pointer;
  }
`;

export function Menu(props) {
  const { list, onChange, gap, childComponent } = props;

  const container = useRef(null);

  const [selected, setSelected] = useState();
  const [mouseY, setMouseY] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [ms, setMs] = useState(0);

  const [itemsPositions, setItemsPosition] = useState([]);

  useEffect(() => {
    //console.log(container.current.children);
    //console.log(children);
    // if (!itemsPositions.length)
    //   setItemsPosition(
    //     Array.from(container.current.children).map((item) => item.offsetTop)
    //   );
    //   console.log(itemsPositions);
    //if(selected?.index)
  }, [selected]);

  function mouseMoveHandler(event) {
    if (!selected) return;

    const { clientY } = event;

    setMouseY(ms + clientY - mouseStart);

    if (mouseY > selected.top + selected.height / 2) {
      swapElems(selected.index + 1);
      return;
    }

    if (mouseY < selected.top - selected.height / 2) {
      swapElems(selected.index - 1);
    }
  }

  function clickHandler(event, index, data) {
    console.log(event, index);

    setSelected({
      top: event.target.offsetTop,
      //left: event.target.offsetLeft,
      height: event.target.clientHeight,
      index,
      ...data,
    });
    setMouseY(event.target.offsetTop);
    setMouseStart(event.clientY);
    setMs(event.target.offsetTop);
  }

  function doubleClickHandler(event) {}

  function swapElems(swappedIndex) {
    if (swappedIndex < 0 || swappedIndex >= list.length) return;

    const swappedList = [...list];
    swappedList[selected.index] = list[swappedIndex];
    swappedList[swappedIndex] = list[selected.index];
    onChange(swappedList);

    const { offsetTop, clientHeight } =
      container.current.children[swappedIndex];
    setSelected({
      ...selected,
      index: swappedIndex,
      height: clientHeight,
      top: offsetTop,
    });
  }

  return (
    <StyledMenu
      ref={container}
      onMouseMove={mouseMoveHandler}
      onMouseUp={() => setSelected()}
      onMouseLeave={() => setSelected()}
    >
      {list.map(([key, data], i) => {
        const { name, number, isActive } = data;

        return (
          <div
            key={key}
            onMouseDown={(e) => clickHandler(e, i, data)}
            onDoubleClick={() => doubleClickHandler(data)}
            //onTouchStart={console.log}

            style={i === selected?.index ? { visibility: "hidden" } : {}}
          >
            {number + ". " + name} // paste component
          </div>
        );
      })}
      {selected && (
        <div
          style={{
            position: "absolute",
            background: "white",
            width: "100%",
            top: mouseY,
          }}
        >
          {selected?.number + ". " + selected?.name}
        </div>
      )}
    </StyledMenu>
  );
}
