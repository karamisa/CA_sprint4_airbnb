import classes from './btn-nav-rounded.module.css'

export function BtnNavRounded({ children, ...props }) {
  return (
    <button {...props} className={classes.btnNavRounded}>
      {children}
    </button>
  )
}
