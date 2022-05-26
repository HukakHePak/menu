import { useRef, useState } from "react";
import styled from "styled-components";
import { getComponent } from "../helpers/getComponent";
import { swapElements } from "../helpers/swapElements";
import { touchToMouse } from "../helpers/touchToMouse";

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  word-wrap: break-word;
  box-sizing: border-box;
  touch-action: none;
  user-select: none;

  & > div {
    cursor: pointer;
  }
`;

export function Menu(props) {
  const {
    className,
    list,
    onChange,
    style,
    children,
    senseTime = 200,
    activeColor = "rgba(0, 0, 0, 0.38)",
  } = props;

  const container = useRef(null);

  const [selected, setSelected] = useState({});
  const { index, height, top, data, time, width, currentTop } = selected;
  const [mouseY, setMouseY] = useState(0);
  const [mouseStart, setMouseStart] = useState(0);

  const childComponent = getComponent(children);

  function mouseMoveHandler({ clientY }) {
    if (index === undefined) return;

    setMouseY(top + clientY - mouseStart);

    if (mouseY > currentTop + height) {
      swapElems(index + 1);
      return;
    }

    if (mouseY < currentTop - height) {
      swapElems(index - 1);
    }
  }

  function swapElems(swap) {
    if (swap < 0 || swap >= list.length) return;

    onChange(swapElements(list, index, swap));

    setSelected({
      ...selected,
      index: swap,
      currentTop: container.current.children[swap].offsetTop
    });
  }

  function clickHandler(event, index, data) {
    const { offsetTop, clientHeight, clientWidth } = event.target;

    setSelected({
      top: offsetTop,
      currentTop: offsetTop,
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
    if (new Date() - time < senseTime) {
      const newList = [...list];
      newList[index][1].isActive = !newList[index][1].isActive;

      onChange(newList);
    }

    setSelected({});
  }

  return (
    <StyledMenu
      className={className}
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
              width: "100%",
              height: "100%",
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
            width,
            height,
            color: data.isActive ? "black" : activeColor,
            top: mouseY,
          }}
        >
          {childComponent ? childComponent(data) : data.name}
        </div>
      )}
    </StyledMenu>
  );
}
