import { Link } from "react-router-dom"
import axios from 'axios'
import UserNav from "./UserNav"
import IntroFooter from "./IntroFooter"
import { useState, useEffect, useContext } from "react"
import UserContext from "../UserContext"
import Dashboard from "./Dashboard"

export default function LogIn(){
    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const { Response, setResponse } = useContext(UserContext)
    const [formState, setFormState] = useState('')

    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value})
    }

    // useEffect(()=> {
    //     console.log('useEffect working')
    //     const getBusinessInfoAPI = async() => {
    //         const response = await axios.get('http://localhost:8000/business/')
    //         for (let i = 0; i < response.data.length; i++){
    //             if (response.data[i].business_name == formState.business_name){
    //                 // const response2 = await axios.put(`http://localhost:8000/business/${i}`, is_logged_in= true)
    //                 setBusinessInfo(response.data[i])
    //                 console.log(businessInfo)
    //             }
    //         }
    //     }
    //     getBusinessInfoAPI()   
    // },[])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log('working')
        const response = await axios.get('http://localhost:8000/business/')
        // let is_logged_in;
        for (let i = 0; i < response.data.length; i++){
            if (response.data[i].business_name == formState.business_name){
                const response2 = await axios.put(`http://localhost:8000/business/${i}`, {...businessInfo, is_logged_in: true})
                setBusinessInfo(response.data[i])
            }
        }
        const businessInfoAsString = JSON.stringify(response.data)
        console.log(response.data)
        localStorage.setItem('businessInfo', businessInfoAsString)
        console.log(localStorage.getItem('businessInfo'))
        //thanks to help from chatGPT for this localStorage fix
    }
                   
    return (
        <div>
            {/* <UserNav /> */}
            <div className="user-account-change signup">
                <div className="user-top">
                    <h1>Log In</h1>
                    <p>Want to create a new account? <Link className='user-bridge-link' to='/dashboard/signup'>Sign Up</Link></p>
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
                <button className='user-submit-button' onClick={handleSubmit}>Log In</button>
            </div>
            <IntroFooter />
        </div>
    )
}

//thanks to chatgpt, bard, and various websites for a lot of the data around how to calculate spending, marketing, and environmental data