import { Link } from "react-router-dom"
import axios from 'axios'
import UserNav from "./UserNav"
import IntroFooter from "./IntroFooter"
import { useState, useEffect, useContext } from "react"
import UserContext from "../UserContext"
import Dashboard from "./Dashboard"
import LogIn from "./LogIn"

export default function LogOut(){
    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const { Response, setResponse } = useContext(UserContext)
    // const [nameFormState, setNameFormState] = useState('')
    // const [usernameFormState, setUsernameFormState] = useState('')
    // const [passwordFormState, setPasswordFormState] = useState('')

    // const usernameHandleChange = (event) => {
    //     setUsernameFormState(event.target.value)
    // }
    // const passwordHandleChange = (event) => {
    //     setPasswordFormState(event.target.value)
    // }

    // useEffect(()=> {
    //     setBusinessInfo({
    //         business_name: nameFormState,
    //         business_username: usernameFormState,
    //         business_password: passwordFormState
    //     })
    // },[])
    
    const handleSubmit = async(e) => {
        e.preventDefault()
        // setBusinessInfo({...businessInfo, is_logged_in: false})
        const response = await axios.put(`http://localhost:8000/business/${businessInfo.id}`, {...businessInfo, is_logged_in: false})
        console.log(response)

    }

    const handleDelete = async() => {
        const response = await axios.delete(`http://localhost:8000/business/${businessInfo.id}`)
    }
        // setBusinessInfo({...businessInfo, business_id: businessInfo.id})
        // const businessInfoAsString = JSON.stringify(response.data)
        // console.log(response.data)
        // localStorage.setItem('businessInfo', businessInfoAsString)
        // console.log(localStorage.getItem('businessInfo'))
        //thanks to help from chatGPT for this localStorage fix
        // console.log(response.data)
        // setBusinessInfo({...businessInfo, [id]: business_url.splice(31,34)})

    // useEffect(()=>{
    //     setBusinessInfo({...businessInfo, is_logged_in: false})
    //     const getBusinessInfo = async() => {
    //         const response = await axios.get(`http://localhost:8000/business/`)
    //             setBusinessInfo(response.data[response.data.length-1])
    //     }
    //     getBusinessInfo()
    // },[])
        
    return (
        <div>
            {/* <UserNav /> */}
            <div className="user-account-change signup">
                <div className="user-top">
                    <h1>Log Out</h1>
                </div>
                <button className='user-submit-button' onClick={handleSubmit}><Link className="log-out-link" to='/dashboard/login'>Log Out</Link></button>
                <button className='delete-button' onClick={handleDelete}>Delete Account</button>
                {/* <Link className='user-submit-link' to='/dashboard'></Link>  */}
            </div>
            <IntroFooter />
        </div>
    )
}