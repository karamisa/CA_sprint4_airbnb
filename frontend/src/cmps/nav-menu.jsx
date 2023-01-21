import { useState } from "react"
import { Link } from "react-router-dom"

export function NavMenu({user, onLogout, onAddStay}) {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleToggle = () => {
        setNavbarOpen(prev => !prev)
        if (navbarOpen) {
            
        }
    }


    return <nav className="nav-menu" onClick={handleToggle}>
        <div className="menu-btn">
            <div className="menu-hamburger">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false"><g fill="none" fillRule="nonzero"><path d="m2 16h28"></path><path d="m2 24h28"></path><path d="m2 8h28"></path></g></svg>
            </div>
            <div className="menu-avatar">
                {user.imgUrl && <img src={user.imgUrl} alt={user.fullname} />}
                {!user?.imgUrl && <img src="https://a0.muscache.com/defaults/user_pic-50x50.png?v=3" alt="" />}
            </div>
        </div>
        {navbarOpen && <div className="menu-links">
            <a href="#">Trips</a>
            <a href="#">Messages</a>
            {user.isOwner && <Link to="/hosting/order">View Orders (host)</Link>}
            {/* <a href="#">Sign up</a> */}
            {/* <a href="#">Log out</a> */}

            <button onClick={onAddStay}>{user.isOwner? 'Add Another Stay' : 'Become a host (Add stay)' }</button>
            <button onClick={onLogout}>Log out</button>
        </div>}
    </nav>
}
