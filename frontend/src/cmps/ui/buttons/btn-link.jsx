import classes from './btn-link.module.css'

export function BtnLink({ children, ...props }) {
  return (
    <button {...props} className={classes.btnLink}>
      {children}
    </button>
  )
}
