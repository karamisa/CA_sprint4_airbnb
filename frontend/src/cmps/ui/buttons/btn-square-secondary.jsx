import classes from './btn-square-secondary.module.css';

export function BtnSquareSecondary({ children, ...props }) {
  return (
    <button {...props} className={classes.btnSquareSecond}>
      {children}
    </button>
  );
}
