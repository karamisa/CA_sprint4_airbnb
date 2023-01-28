import classes from './btn-card-lg.module.css'

export function BtnCardLg({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${classes.btnCardLg} ${
        props.className ? props.className : ''
      }`}>
      {children}
    </button>
  )
}
