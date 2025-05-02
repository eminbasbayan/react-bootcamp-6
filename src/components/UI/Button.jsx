import "./Button.css";

function Button({ color, size, addClass, title, children }) {
  /*   const { color, size, addClass, title } = props; */
  const classNames = `btn btn-${color} btn-${size} ${addClass}`;

  return <button className={classNames}>{children}</button>;
}

export default Button;
