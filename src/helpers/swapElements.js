export function swapElements(list, current, swap) {
  const newList = [...list];
  newList[current] = list[swap];
  newList[swap] = list[current];

  return newList;
}
