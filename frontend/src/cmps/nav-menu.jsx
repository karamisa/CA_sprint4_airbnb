import { useState } from "react"

export function NavMenu() {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
    }
    const handleBlur = () => {
        setNavbarOpen(false)
    }

    return <nav className="nav-menu" onClick={handleToggle}>
        <div className="menu-btn">
            <div className="menu-hamburger">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
            </div>
            <div className="menu-avatar">
                <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" />
            </div>
        </div>
       {navbarOpen && <div className="menu-links">
            {/* <div className={navbarOpen ? "menu-links-open" : "menu-links-closed"}> */}
                <a href="#">Trips</a>
                <a href="#">Messages</a>
                <a href="#">Sign up</a>
                <a href="#">Log in</a>
            {/* </div> */}
        </div>}
    </nav>
}
