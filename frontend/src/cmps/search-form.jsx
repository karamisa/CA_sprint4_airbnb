export function SearchForm() {
    return (
        <section className="search-form">
            <div className="search-form-inputs">
                <button className="search-destinaitons">Where</button>
                <span className="splitter"></span>
                <button className="search-any-week">Any week</button>
                <span className="splitter"></span>
                <button className="search-add-guests">Add guests</button>
                <button className="search-btn">
                    <section className="search-icon">
                    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g fill="none"><path d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"></path></g></svg>
                    </section>
                </button>
            </div>
        </section>
    );
}