import { Link } from "react-router-dom"
import UserContext from "../UserContext"
import { useState, useEffect, useContext } from 'react'
import screenshot from '../images/website.png'
import axios from 'axios'
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import PieChart from "./PieChart"

export default function Marketing(){
    
    // Variables

    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const [Response, setResponse] = useState(null)
    const [inputDisplay, setInputDisplay] = useState('none')
    const [dataDisplay, setDataDisplay] = useState('none')
    const [SEOAnalysisDisplay, setSEOAnalysisDisplay] = useState('none')
    const [SEORecommendationsDisplay, setSEORecommendationsDisplay] = useState('none')
    const [socialMediaRecommendationsDisplay, setSocialMediaRecommendationsDisplay] = useState('none')

    let marketingInitialState = {
        business_id:businessInfo.id,
        business_name:businessInfo.business_name,
        data_title:'marketing',
        average_target_age: '',
        percent_women: '',
        target_state: '',
        // industry_rec: '',
        website: ''
    }
    const [marketingInfo, setMarketingInfo] = useState(marketingInitialState)
    const [url, setUrl] = useState('')
    const [info, setInfo] = useState('')
    const [imagePath, setImagePath] = useState('https://images.pexels.com/photos/17463091/pexels-photo-17463091/free-photo-of-lightning-bolt-in-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    
    let newMarketingInfoArray = []
    let newMarketingInfoKeys = []
    const [marketingInfoArray, setMarketingInfoArray] = useState(Object.values(marketingInfo))
    const [userData, setUserData] = useState({
        labels: ['target demographic','percent women','target state'],
        datasets: [
            {
                data: marketingInfoArray.map(data=>parseFloat(data)),
                backgroundColor: [
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    
    // onChange Input Functions

    const handleChange = (event) => {
        console.log(businessInfo.id)
        setMarketingInfo({...marketingInfo, [event.target.id]: event.target.value})
    }

    const handleWebsiteChange = (event) => {
        setMarketingInfo({...marketingInfo, [event.target.id]: event.target.value})
        setUrl(event.target.value)
        console.log(url)
    }

    // Post Requests on Submit

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(marketingInfo)
        
        const postMarketingData = async() => {
            try{
                const response2 = await axios.post(`http://localhost:8000/business/${businessInfo.id}/marketingdata/`, marketingInfo)  
            } catch(e){
                console.log(e.response.data)
            }
        }
        setTimeout(postMarketingData, 500)

        setUserData({
            labels: ['target demographic','percent women','target state'],
            datasets: [
                {
                    data: newMarketingInfoArray.map(data=>parseFloat(data)),
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB',
                        'white'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })

        const getScrapedData = async() => {
            const response = await axios.post(`http://localhost:4000/getinfo`, {url: url})
            setInfo(JSON.stringify(response.data))
            console.log('response', response)
        }
        getScrapedData()

        setImagePath(screenshot)
    }


    // Changing Tabs

    const changeInputDisplay = (event) => {
        if(inputDisplay === 'none'){
            setInputDisplay('block')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    
    const changeDataDisplay = (event) => {
        if(dataDisplay === 'none'){
            setDataDisplay('flex')
            setInputDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    const changeSEOAnalysisDisplay = (event) => {
        if(SEOAnalysisDisplay === 'none'){
            setSEOAnalysisDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    const changeSEORecommendationsDisplay = (event) => {
        if(SEORecommendationsDisplay === 'none'){
            setSEORecommendationsDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    const changeSocialMediaRecommendationsDisplay = (event) => {
        if(socialMediaRecommendationsDisplay === 'none'){
            setSocialMediaRecommendationsDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setSEOAnalysisDisplay('none')
            setSEORecommendationsDisplay('none')
            setSocialMediaRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    // Social Media Analysis

    let AgeRec; 
    let GenderRec;
    let StateRec;
    let IndustryRec1;
    let IndustryRec2;
    let IndustryRec3;
    let TotalRec;

    if(marketingInfo.target_state === 'Alabama' || marketingInfo.target_state === 'alabama' || marketingInfo.target_state === 'Arkansas' || marketingInfo.target_state === 'arkansas' || marketingInfo.target_state === 'Colorado' || marketingInfo.target_state === 'colorado' || marketingInfo.target_state === 'Georgia' || marketingInfo.target_state === 'georgia' || marketingInfo.target_state === 'Indiana' || marketingInfo.target_state === 'indiana' || marketingInfo.target_state === 'Kentucky' || marketingInfo.target_state === 'kentucky' || marketingInfo.target_state === 'Louisiana' || marketingInfo.target_state === 'louisiana' || marketingInfo.target_state === 'Massachusetts' || marketingInfo.target_state === 'massachusetts' || marketingInfo.target_state === 'Mississippi' || marketingInfo.target_state === 'mississippi' || marketingInfo.target_state === 'Missouri' || marketingInfo.target_state === 'missouri' || marketingInfo.target_state === 'North Carolina' || marketingInfo.target_state === 'north carolina' || marketingInfo.target_state === 'Ohio' || marketingInfo.target_state === 'ohio' || marketingInfo.target_state === 'Pennsylvania' || marketingInfo.target_state === 'pennsylvania' || marketingInfo.target_state === 'South Carolina' || marketingInfo.target_state === 'south carolina' || marketingInfo.target_state === 'Tennessee' || marketingInfo.target_state === 'tennessee' || marketingInfo.target_state === 'Virginia' || marketingInfo.target_state === 'virginia' || marketingInfo.target_state === 'West Virginia' || marketingInfo.target_state === 'west virginia') {
        StateRec = 'Facebook'
    } else if(marketingInfo.target_state === 'Connecticut' || marketingInfo.target_state === 'connecticut' || marketingInfo.target_state === 'Delaware' || marketingInfo.target_state === 'delaware' || marketingInfo.target_state === 'Hawaii' || marketingInfo.target_state === 'hawaii' || marketingInfo.target_state === 'Maryland' || marketingInfo.target_state === 'maryland' || marketingInfo.target_state === 'Nevada' || marketingInfo.target_state === 'nevada' || marketingInfo.target_state === 'New Jersey' || marketingInfo.target_state === 'new jersey' ||marketingInfo.target_state === 'New York' || marketingInfo.target_state === 'new york' || marketingInfo.target_state === 'Oregon' || marketingInfo.target_state === 'oregon' || marketingInfo.target_state === 'Rhode Island' || marketingInfo.target_state === 'rhode island' || marketingInfo.target_state === 'Washington' || marketingInfo.target_state === 'washington'){
        StateRec = 'Instagram'
    } else if(marketingInfo.target_state === 'Idaho' || marketingInfo.target_state === 'idaho' || marketingInfo.target_state === 'Iowa' || marketingInfo.target_state === 'iowa' || marketingInfo.target_state === 'Maine' || marketingInfo.target_state === 'maine' || marketingInfo.target_state === 'Minnesota' || marketingInfo.target_state === 'montana' || marketingInfo.target_state === 'New Hampshire' || marketingInfo.target_state === 'new hampshire' || marketingInfo.target_state === 'Utah' || marketingInfo.target_state === 'utah' || marketingInfo.target_state === 'Vermont' || marketingInfo.target_state === 'vermont' || marketingInfo.target_state === 'Wyoming' || marketingInfo.target_state === 'wyoming'){
        StateRec = 'Pinterest'
    } else if(marketingInfo.target_state === 'Arizona' || marketingInfo.target_state === 'arizona' || marketingInfo.target_state === 'California' || marketingInfo.target_state === 'california' || marketingInfo.target_state === 'Florida' || marketingInfo.target_state === 'florida' || marketingInfo.target_state === 'Illinois' || marketingInfo.target_state === 'illinois' || marketingInfo.target_state === 'Kansas' || marketingInfo.target_state === 'kansas' || marketingInfo.target_state === 'Michigan' || marketingInfo.target_state === 'michigan' || marketingInfo.target_state === 'Nebraska' || marketingInfo.target_state === 'Nebraska' || marketingInfo.target_state === 'New Mexico' || marketingInfo.target_state === 'new mexico' || marketingInfo.target_state === 'North Dakota' || marketingInfo.target_state === 'north dakota' || marketingInfo.target_state === 'Oklahoma' || marketingInfo.target_state === 'oklahoma' || marketingInfo.target_state === 'South Dakota' || marketingInfo.target_state === 'south dakota' || marketingInfo.target_state === 'Texas' || marketingInfo.target_state === 'texas' || marketingInfo.target_state === 'Washington' || marketingInfo.target_state === 'washington'){
        StateRec = 'TikTok'
    }

    if(marketingInfo.industry_rec === 'Retail'|| marketingInfo.industry_rec === 'Travel') {
        IndustryRec1 = 'Instagram'
        IndustryRec2 = 'Tiktok'
        IndustryRec3 = 'Pinterest'
    } else if(marketingInfo.industry_rec === 'Food & Beverage') {
        IndustryRec1 = 'Instagram'
        IndustryRec2 = 'Tiktok'
    } else if(marketingInfo.industry_rec === 'Education') {
        IndustryRec1 = 'YouTube'
        IndustryRec2 = 'LinkedIn'
        IndustryRec3 = 'Twitter'
    } else if(marketingInfo.industry_rec = 'Healthcare'){
        IndustryRec1 = 'LinkedIn'
        IndustryRec2 = 'Twitter'
        IndustryRec3 = 'YouTube'
    } else if(marketingInfo.industry_rec = 'B2B'){
        IndustryRec1 = 'LinkedIn'
        IndustryRec2 = 'Twitter'
        IndustryRec3 = 'YouTube'
    } else if(marketingInfo.industry_rec = 'B2C'){
        IndustryRec1 = 'Facebook'
        IndustryRec2 = 'Instagram'
        IndustryRec3 = 'TikTok'
    } else {
        IndustryRec1 = '[No Industry Selected]'
        IndustryRec2 = '[No Industry Selected]'
        IndustryRec3 = '[No Industry Selected]'
    }

    if (25 <= AgeRec <= 34 && 42 <= GenderRec <= 46 && StateRec == 'Facebook'){
        TotalRec = 'Facebook'
    } else if (18 <= AgeRec <= 24 && 46 <= GenderRec <= 48 && StateRec == 'Instagram'){
        TotalRec = 'Instagram'
    } else if (18 <= AgeRec <= 24 && 52 <= GenderRec <= 56 && StateRec == 'TikTok'){
        TotalRec = 'TikTok'
    } else if (25 <= AgeRec <= 34 && 74 <= GenderRec <= 78 && StateRec == 'Pinterest'){
        TotalRec = 'Pinterest'
    } else if (25 <= AgeRec <= 34 && StateRec == 'Facebook'){
        TotalRec = 'Facebook'
    } else if (18 <= AgeRec <= 24 && StateRec == 'Instagram'){
        TotalRec = 'Instagram'
    } else if (18 <= AgeRec <= 24 && StateRec == 'TikTok'){
        TotalRec = 'TikTok'
    } else if (25 <= AgeRec <= 34 && StateRec == 'Pinterest'){
        TotalRec = 'Pinterest'
    } else if (25 <= AgeRec <= 34 || StateRec == 'Facebook'){
        TotalRec = 'Facebook'
    } else if (18 <= AgeRec <= 24 || StateRec == 'Instagram'){
        TotalRec = 'Instagram'
    } else if (18 <= AgeRec <= 24 || StateRec == 'TikTok'){
        TotalRec = 'TikTok'
    } else if (25 <= AgeRec <= 34 || StateRec == 'Pinterest'){
        TotalRec = 'Pinterest'
    } else {
        TotalRec = "[State Doesn't Exist]"
    }

    return (
        <div className="marketing">
            <h1 className="marketing-header">A Hub for All of Your Marketing Information</h1>
            <div className="tabs">
                <button className="tab-button marketing-tab" onClick={changeInputDisplay}>Data Inputs</button>
                <button className="tab-button marketing-tab" onClick={changeDataDisplay}>Data</button>
                <button className="tab-button marketing-tab" onClick={changeSEOAnalysisDisplay}>SEO Analysis</button>
                <button className="tab-button marketing-tab" onClick={changeSEORecommendationsDisplay}>SEO Advice</button>
                <button className="tab-button marketing-tab" onClick={changeSocialMediaRecommendationsDisplay}>Social Media Advice</button>
            </div>
            <div className="data" 
            style={{display: inputDisplay}}
            >
                <div className="data-inputs">
                    <div className="data-input-column">
                        <h1 className='marketing-input-header'>SEO Data</h1>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="website"onChange={handleWebsiteChange} placeholder="Website URL"/>
                        </div>
                    </div>
                    <div className="data-input-column">
                        <h1 className='marketing-input-header'>Social Media Data</h1>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="average_target_age" onChange={handleChange} placeholder="Average Customer Age or Target Age"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="percent_women" onChange={handleChange} placeholder="Percent Women Customers or Target Percent"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="target_state" onChange={handleChange} placeholder="Average State your Customer Lives in or Target State"/>
                        </div>
                        <div className="data-input-container">
                            <select name='Industry' className='data-input' id="industry_rec" onChange={handleChange}>
                                <option value="retail">Retail</option>
                                <option value="foodandbeverage">Food & Beverage</option>
                                <option value="healthcare">Healthcare</option>
                                <option value="education">Education</option>
                                <option value="B2B">B2B</option>
                                <option value="B2C">B2C</option>
                            </select>
                        </div>
                    </div>
                </div>
                <button className='submit-button' onClick={handleSubmit}>Submit</button>
            </div>
            <div className="displayed-data" 
            style={{display: dataDisplay}}
            >
                <div className='displayed-data-container'>
                    <div className="displayed-data-left">
                        <h1 className="tab-header">Website: {marketingInfo.website}</h1>
                        <h2>{info}</h2>
                        <img src={imagePath} alt="" />
                    </div>
                    <div className="displayed-data-right">
                    </div>
                </div>
            </div>
            <div className="displayed-analysis" 
            style={{display: SEOAnalysisDisplay}}
            >
                <h4>SEO Analysis </h4>
            </div>
            <div className="displayed-recommendations" style={{display: SEORecommendationsDisplay}}>
                <h1>SEO Recommendations</h1>
            </div>
            <div className="displayed-recommendations" style={{display: socialMediaRecommendationsDisplay}}>
                <h1 className='tab-header'>Social Media Recommendations</h1>
                <BarChart chartData={userData} />
                <p className='recommendation'>Based on your current or target customer demographics, we recommend to prioritize marketing on {TotalRec}, however the more social media sites you can market on the better.</p>
                <p className='recommendation'>We would also recommend, based on your industry, that you also focus on {IndustryRec1}, {IndustryRec2}, and {IndustryRec3}.</p>
                <p className='recommendation'>We also recommend that you utilize social media, especially the sites mentioned above, to educate your audience, produce different kinds of content, look for micro-influencers, as well as try stories and live streaming.</p>
                <p className='recommendation'>Also look for businesses similar to yours that are popular and see what they are posting. This can be very important for social media growth.</p>
            </div>
        </div>
    )
}