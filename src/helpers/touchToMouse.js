export function touchToMouse(event) {
  const { clientY, target } = event.changedTouches[0];
  return { clientY, target };
}
