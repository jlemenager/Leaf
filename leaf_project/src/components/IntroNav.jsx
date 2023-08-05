import { Link } from "react-router-dom";
import logo from '../images/logo.png'

export default function IntroNav(){
    return(
        <nav>
            <Link className='nav-title-link' to='/'>
                <div className="nav-title">
                    <img className='logo' src={logo} alt="logo" />
                    <h1 className="nav-title-text">Leaf</h1>
                </div>
            </Link>
            <div className="links">
                <Link className='link' to='/dashboard/login'>Log In</Link>
                <Link className='link' to='/dashboard/signup'>Sign Up</Link>
            </div>
        </nav>
    )
}