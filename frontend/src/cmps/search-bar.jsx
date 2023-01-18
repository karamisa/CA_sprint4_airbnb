import { SearchBtn } from "./search-btn";

export function SearchBar() {
    return (
            <div className="search-preview">
                <button className="search-anywhere">Anywhere</button>
                <span className="splitter"></span>
                <button className="search-any-week">Any week</button>
                <span className="splitter"></span>
                <button className="search-add-guests">Add guests</button>
                <SearchBtn />
            </div>
    );
}