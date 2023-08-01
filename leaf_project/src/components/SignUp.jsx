import { Link } from "react-router-dom"
import axios from 'axios'
import UserNav from "./UserNav"
import IntroFooter from "./IntroFooter"
import { useState, useEffect, useContext } from "react"
import UserContext from "../UserContext"

export default function SignUp(){
    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const { Response, setResponse } = useContext(UserContext)
    // const [nameFormState, setNameFormState] = useState('')
    // const [usernameFormState, setUsernameFormState] = useState('')
    // const [passwordFormState, setPasswordFormState] = useState('')

    const handleChange = (event) => {
        setBusinessInfo({...businessInfo, [event.target.id]: event.target.value, is_logged_in: true})
    }

    // const usernameHandleChange = (event) => {
    //     setUsernameFormState(event.target.value)
    // }
    // const passwordHandleChange = (event) => {
    //     setPasswordFormState(event.target.value)
    // }
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:8000/business/', businessInfo)
        setBusinessInfo(response.data)
        console.log(businessInfo)
        // setTimeout(console.log(response.data),500)
        const businessInfoAsString = JSON.stringify(response.data)
        localStorage.setItem('businessInfo', businessInfoAsString)
        console.log(businessInfo)
        console.log(localStorage.getItem('businessInfo'))
        //thanks to help from chatGPT for this localStorage fix
        // console.log(response.data)
        // setBusinessInfo({...businessInfo, [id]: business_url.splice(31,34)})
    }

    return (
        <div>
            {/* <UserNav /> */}
            <div className="user-account-change signup">
                <div className="user-top">
                    <h1>Sign Up</h1>
                    <p>Already have an account? <Link className='user-bridge-link' to='/login'>Log In</Link></p>
                </div>
                <div className="user-forms">
                    <div className="business-name-form user-form-section">
                        <input className='user-input business-name-input' type="text" id='business_name' onChange={handleChange} placeholder="Your business..."/>
                    </div>
                    <div className="username-form user-form-section">
                        <input className='user-input username-input' type="text" id='business_username' onChange={handleChange} placeholder="Your username..." />
                    </div>
                    <div className="password-name-form user-form-section">
                        <input className='user-input password-input' type="text" id='business_password' onChange={handleChange} placeholder="Your password..." />
                    </div>
                </div>
                <button className='user-submit-button' onClick={handleSubmit}>Sign Up</button>
                {/* <Link className='user-submit-link' to='/dashboard'></Link>  */}
            </div>
            <IntroFooter />
        </div>
    )
}