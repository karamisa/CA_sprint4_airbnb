import classes from './btn-square-black.module.css'

export function BtnSquareBlack({ children, ...props }) {
  return (
    <button {...props} className={classes.btnSquareSecond}>
      {children}
    </button>
  )
}
