import classes from './btn-card.module.css'

export function BtnCard({ children, ...props }) {
  return (
    <button
      {...props}
      className={`${classes.btnCard} ${
        props.className ? props.className : ''
      }`}>
      {children}
    </button>
  )
}
