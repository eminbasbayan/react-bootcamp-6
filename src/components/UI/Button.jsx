import "./Button.css";

function Button({ color, size, addClass, title }) {
  /*   const { color, size, addClass, title } = props; */
  const classNames = `btn btn-${color} btn-${size} ${addClass}`;

  return <button className={classNames}>{title}</button>;
}

export default Button;
