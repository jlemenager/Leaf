import { Link } from "react-router-dom";

export default function UserNav(){
    return(
        <nav>
            <Link className='nav-title-link' to='/'>
                <div className="nav-title">
                    <img className='logo' src="src/images/logo.png" alt="logo" />
                    <h1 className="nav-title-text">Leaf</h1>
                </div>
            </Link>
            <div className="user-nav-welcome">
                <h2>Welcome to Leaf!</h2>
            </div>
        </nav>
    )
}