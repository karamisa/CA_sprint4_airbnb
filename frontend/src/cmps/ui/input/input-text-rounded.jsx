import classes from './input-text-rounded.module.css'

const icon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='25'
    shapeRendering='geometricPrecision'
    textRendering='geometricPrecision'
    imageRendering='optimizeQuality'
    fillRule='evenodd'
    clipRule='evenodd'
    viewBox='0 0 512 512'>
    <path d='M512 256c0 70.67-28.66 134.69-74.98 181.02C390.69 483.34 326.68 512 256 512s-134.69-28.66-181.02-74.98C28.66 390.69 0 326.67 0 256c0-70.68 28.66-134.69 74.98-181.01C121.31 28.66 185.32 0 256 0c70.67 0 134.69 28.66 181.02 74.99C483.34 121.31 512 185.32 512 256zm-160.23 21.5h-43.38v67.93c0 7.63-6.27 13.9-13.91 13.9H217.5c-7.62 0-13.9-6.25-13.9-13.9v-67.92h-43.41c-16.71 0-25.11-19.9-14.05-31.96l96.01-112.04c7.54-9.12 21.31-9.13 29.04-.38l94.96 112.8c10.83 12.43 1.66 31.55-14.38 31.57z' />
  </svg>
)

export function InputTextRounded({ className, ...props }) {
  return (
    <div className={classes.wrapper}>
      <div className={classes.messageText} contentEditable></div>
      <button>{icon}</button>
    </div>
  )
}
