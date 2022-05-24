



export function MenuItem(props) {
  const { data = {}, position } = props;
  const { name, isActive, number } = data;

  return <div   >{number + ". " + name}</div>;
}
