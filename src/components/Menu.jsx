import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

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
  const { list, onChange, style, children } = props;

  const container = useRef(null);

  const [{ index, height, top, data }, setSelected] = useState({});
  const [mouseY, setMouseY] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [itemsPositions, setItemsPosition] = useState([]);

  function mouseMoveHandler({ clientY }) {
    if (index === undefined) return;

    setMouseY(top + clientY - mouseStart);

    if (mouseY > itemsPositions[index] + height / 2) {
      swapElems(index + 1);
      return;
    }

    if (mouseY < itemsPositions[index] - height / 2) {
      swapElems(index - 1);
    }
  }

  function clickHandler(event, index, data) {
    setItemsPosition(
      Array.from(container.current.children).map((item) => item.offsetTop)
    );

    setSelected({
      top: event.target.offsetTop,
      height: event.target.clientHeight,
      index,
      data,
    });

    setMouseY(event.target.offsetTop);
    setMouseStart(event.clientY);
  }

  function doubleClickHandler(i, data) {

  }

  function swapElems(swappedIndex) {
    if (swappedIndex < 0 || swappedIndex >= list.length) return;

    const swappedList = [...list];
    swappedList[index] = list[swappedIndex];
    swappedList[swappedIndex] = list[index];

    onChange(swappedList);

    setSelected({
      data,
      height,
      top,
      index: swappedIndex,
    });
  }

  return (
    <StyledMenu
      ref={container}
      onMouseMove={mouseMoveHandler}
      onMouseUp={() => setSelected({})}
      onMouseLeave={() => setSelected({})}
      style={
        container?.current
          ? {
              width: container?.current.clientWidth,
              height: container?.current.clientHeight,
              ...style,
            }
          : style
      }
    >
      {list.map(([key, data], i) => {
        return (
          <div
            key={key}
            onMouseDown={(e) => clickHandler(e, i, data)}
            onDoubleClick={() => doubleClickHandler(i, data)}
            //onTouchStart={console.log}
            style={
              index !== undefined
                ? {
                    position: "absolute",

                    width: container.current.clientWidth,
                    top: i === index ? mouseY : itemsPositions[i],
                    zIndex: +(i === index),
                  }
                : {}
            }
          >
            {
              children.find((item) => typeof item === "function")(data) // сделать проверку на существование
            }
          </div>
        );
      })}
    </StyledMenu>
  );
}
