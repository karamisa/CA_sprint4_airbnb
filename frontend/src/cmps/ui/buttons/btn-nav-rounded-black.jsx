import classes from './btn-nav-rounded-black.module.css'

export function BtnNavRoundedBlack({ children, ...props }) {
  return (
    <button {...props} className={classes.btnNavRoundedBlack}>
      {children}
    </button>
  )
}
