



export function MenuItem(props) {
  const { data = {}, position } = props;
  const { name, isActive, number } = data;

  return <div style={{ background: 'red', width: '100%'}}  >{number + ". " + name}</div>;
}
