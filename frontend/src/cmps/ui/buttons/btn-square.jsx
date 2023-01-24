import classes from './btn-square.module.css'

export function BtnSquare({ children, ...props }) {
  return (
    <button {...props} className={classes.btnSquare}>
      {children}
    </button>
  )
}
