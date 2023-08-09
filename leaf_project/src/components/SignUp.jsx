import { Link } from "react-router-dom"
import axios from 'axios'
import UserNav from "./UserNav"
import IntroFooter from "./IntroFooter"
import { useState, useEffect, useContext } from "react"
import UserContext from "../UserContext"

export default function SignUp(){
    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const { Response, setResponse } = useContext(UserContext)

    const handleChange = (event) => {
        setBusinessInfo({...businessInfo, [event.target.id]: event.target.value, is_logged_in: true})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await axios.post('https://leaf-database-production.up.railway.app/business/', businessInfo)
        setBusinessInfo(response.data)
        console.log(businessInfo)
        const businessInfoAsString = JSON.stringify(response.data)
        localStorage.setItem('businessInfo', businessInfoAsString)
        console.log(businessInfo)
        console.log(localStorage.getItem('businessInfo'))
        //thanks to help from chatGPT for this localStorage fix
    }

    return (
        <div>
            {/* <UserNav /> */}
            <div className="user-account-change signup">
                <div className="user-top">
                    <h1>Sign Up</h1>
                    <p>Already have an account? <Link className='user-bridge-link' to='/dashboard/login'>Log In</Link></p>
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
            </div>
            <IntroFooter />
        </div>
    )
}