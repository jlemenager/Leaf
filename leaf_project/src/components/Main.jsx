import Nav from "./Nav";
import { Routes,Route } from 'react-router-dom'
import Dashboard from "./Dashboard";
import Marketing from "./Marketing";
import Spending from "./Spending";
import WebDesign from "./WebDesign";
import ESGMetrics from "./ESGMetrics";
import LogIn from "./LogIn";
import LogOut from './LogOut';
import { useState, useContext } from "react";
import UserContext from "../UserContext";
import SignUp from "./SignUp";
import SEO from "./SEO";
import SocialMedia from './SocialMedia';

export default function Main(){
    //     const businessInitialState = {
    //     business_name:'',
    //     business_username:'',
    //     business_password:'',
    //     is_logged_in: true
    //   }
    // 
    // console.log(businessInfoFromStorage)
    // 
     //thanks to help from chatGPT for this localStorage fix
    let businessInfoFromStorage = localStorage.getItem('businessInfo')
    let businessInitialState = businessInfoFromStorage ? JSON.parse(businessInfoFromStorage): {}
    const [businessInfo, setBusinessInfo] = useState(businessInitialState)

    return(
        <div>
            <UserContext.Provider value={{ businessInfo,setBusinessInfo }}>
                <Nav />
                <Routes>
                    <Route path='/' element={<Dashboard />}/>
                    <Route path='/marketing' element={<Marketing />}/>
                    <Route path='/spending' element={<Spending />}/>
                    <Route path='/webdesign' element={<WebDesign />}/>
                    <Route path='/esgmetrics' element={<ESGMetrics />}/>
                    <Route path='/logout' element={<LogOut />} />
                    <Route path='/login' element={<LogIn />} />
                    <Route path='/signup' element={<SignUp />} />
                    <Route path='/marketing/seo' element={<SEO />} />
                    <Route path='/marketing/socialmediastrategy' element={<SocialMedia />} />
                </Routes>
            </UserContext.Provider>
        </div>
    )
}