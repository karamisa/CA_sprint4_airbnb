import classes from './close-btn.module.css'
export function CloseBtn({ ...props }) {
    const svgStyle = {
        display: "block",
        fill: "none",
        height: "16px",
        width: "16px",
        stroke: "currentcolor",
        strokeWidth: 3,
        overflow: "visible",
    }

return (
    <button className={classes.closeBtn} {...props}>
        <svg
            style={svgStyle}
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true" role="presentation"
            focusable="false">
            <path d="m6 6 20 20"></path>
            <path d="m26 6-20 20"></path>
        </svg>
    </button>
)

}