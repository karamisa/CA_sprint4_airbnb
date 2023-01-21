import classes from './btn-square-secondary.module.css';

export function BtnSquareSecondary(props) {
  return <button className={classes.btnSquareSecond}>{props.children}</button>;
}
