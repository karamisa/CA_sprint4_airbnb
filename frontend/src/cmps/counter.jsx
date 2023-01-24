export function Counter({ field, value = 0, onChange }) {

    function incrementCount() {
        onChange(field, value + 1)
    }

    function decrementCount() {
        onChange(field, value - 1)
    }

    return (
        <div className="counter-container flex">
            <button disabled={!value>0} className="counter-decrease-btn" onClick={decrementCount}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28"></path></svg>
            </button>
            <p className="counter-value">{value}</p>
            <button className="counter-increase-btn" onClick={incrementCount}>
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><path d="m2 16h28m-14-14v28"></path></svg>
            </button>
        </div>
    )
}

