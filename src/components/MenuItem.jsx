



export function MenuItem(props) {
  const { data = {}, position } = props;
  const { name, isActive, number } = data;

  return <div style={{ background: 'red'}}  >{number + ". " + name}</div>;
}
