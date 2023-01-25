import classes from './input-text-rounded.module.css'

const btnIcon = (
  <svg
    width='65'
    height='65'
    style={{
      width: '100%',
      height: '100%',
      display: 'block',
      transform: 'scale(0.5)',
    }}>
    <path
      d='M32 2C15.432 2 2 15.432 2 32s13.432 30 30 30s30-13.432 30-30S48.568 2 32 2zm5.143 28.305V49H26.857V30.305H16L32 15l16 15.305H37.143z'
      fill='#000000'></path>
  </svg>
)

export function InputTextRounded({ className, ...props }) {
  return (
    <div className={classes.wrapper}>
      <div class={classes.messageText} contentEditable></div>
      <button>{btnIcon}</button>
    </div>
  )
}
