import classes from './progress-bar.module.css'

export function ProgressBar({ currStep, numSteps, ...props }) {
  const style = {
    gridTemplateColumns: `repeat(${numSteps}, 1fr)`,
  }

  const divs = Array(numSteps)
    .fill(null)
    .map((_, index) => (
      <span
        className={`${classes.step} ${index <= currStep ? classes.done : ''}`}
        key={index}></span>
    ))

  return (
    <div
      style={style}
      className={`${props.className ? props.className : ''} ${
        classes.progressBar
      }`}
      {...props}>
      {divs}
    </div>
  )
}
