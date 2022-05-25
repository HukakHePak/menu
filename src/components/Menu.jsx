import { useRef, useState } from "react";
import styled from "styled-components";

const StyledMenu = styled.div`
  background: #b0d9e8;
  margin: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  user-select: none;
  word-wrap: break-word;
  box-sizing: border-box;

  & > div {
    cursor: pointer;
  }
`;

const senseTime = 500;
const activeColor = "rgba(0, 0, 0, 0.38)";

export function Menu(props) {
  const { list, onChange, style, children } = props;

  const container = useRef(null);

  const [selected, setSelected] = useState({});
  const { index, height, top, data, time, width } = selected;
  const [mouseY, setMouseY] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);
  const [itemsPositions, setItemsPosition] = useState([]);

  const childComponent = Array.isArray(children) && children.find((item) => typeof item === "function");

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

    const { offsetTop, clientHeight, clientWidth } = event.target;

    setSelected({
      top: offsetTop,
      height: clientHeight,
      width: clientWidth,
      index,
      data,
      time: new Date(),
    });

    setMouseY(offsetTop);
    setMouseStart(event.clientY);
  }

  function mouseUpHandler() {
    console.log(new Date() - time < senseTime)

    if (new Date() - time < senseTime) {
      const newList = [...list];
      newList[index][1].isActive = !newList[index][1].isActive;

      onChange(newList);
    }

    setSelected({});
  }

  function swapElems(swappedIndex) {
    if (swappedIndex < 0 || swappedIndex >= list.length) return;

    const swappedList = [...list];
    swappedList[index] = list[swappedIndex];
    swappedList[swappedIndex] = list[index];

    onChange(swappedList);

    setSelected({
      ...selected,
      index: swappedIndex,
    });
  }

  function touchToMouse(event) {
    const { clientY, target } = event.changedTouches[0];
    return { clientY, target };
  }

  return (
    <StyledMenu
      ref={container}
      onMouseMove={mouseMoveHandler}
      onTouchMove={(e) => mouseMoveHandler(touchToMouse(e))}
      onMouseUp={mouseUpHandler}
      onMouseLeave={mouseUpHandler}
      onTouchEnd={() => setSelected({})}
      style={style}
    >
      {list.map(([key, data], i) => {
        return (
          <div
            key={key}
            onMouseDown={(e) => clickHandler(e, i, data)}
            onTouchStart={(e) => clickHandler(touchToMouse(e), i, data)}
            style={{
              ...(i === index && { visibility: "hidden" }),
              color: data.isActive ? "black" : activeColor,
            }}
          >
            {childComponent ? childComponent(data) : data.name}
          </div>
        );
      })}
      {index !== undefined && (
        <div
          style={{
            position: "absolute",
            background: "white",
            width,
            top: mouseY,
          }}
        >
          {childComponent ? childComponent(data) : data.name}
        </div>
      )}
    </StyledMenu>
  );
}
