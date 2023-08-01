import { Link } from 'react-router-dom'

export default function IntroFooter(){
    return(
        <footer className="intro-footer">
            <div className="footer-title">
                <img className='footer-logo' src="src/images/logo.png" alt="logo" />
            </div>
            <div className="footer-links">
                <Link className='footer-link' to='/login'>Log In</Link>
                <Link className='footer-link' to='/signup'>Sign Up</Link>
            </div>
        </footer>
    )
}