export function MenuItem(props) {
  const { data = {}, index } = props;
  const { name, isActive, number } = data;

  return <div onDoubleClick onDrag onDragStart >{number + ". " + name}</div>;
}
