import { Link } from "react-router-dom";
import logo from '../images/logo.png'

export default function Nav(){
    return(
        <nav>
            <Link className='nav-title-link' to='/dashboard'>
                <div className="nav-title">
                    <img className='logo' src={logo} alt="logo" />
                    <h1 className="nav-title-text">Leaf</h1>
                </div>
            </Link>
            <div className="links">
                <Link className='link' to='/dashboard/marketing'>Marketing</Link>
                <Link className='link' to='/dashboard/spending'>Spending</Link>
                <Link className='link' to='/dashboard/webdesign'>Web Design</Link>
                <Link className='link' to='/dashboard/esgmetrics'>ESG Metrics</Link>
                <Link className='link' to='/dashboard/logout'>Log Out</Link>
            </div>
        </nav>
    )
}