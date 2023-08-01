import { Link } from "react-router-dom"
import UserContext from "../UserContext"
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
// import { Bar } from 'react-chartjs-2'

// ChartJS.register(ArcElement, Tooltip, Legend)

export default function Marketing(){

    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const [Response, setResponse] = useState(null)
    // const [ABCRating, setABCRating] = useState(null)
    // const [display, setDisplay] = useState('none')
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

    // let spendingInfoFromStorage = JSON.parse(localStorage.getItem('spendingInfo'))
    const [marketingInfo, setMarketingInfo] = useState(marketingInitialState)
    const [url, setUrl] = useState('')
    const [info, setInfo] = useState('')
    const handleChange = (event) => {
        console.log(businessInfo.id)
        setMarketingInfo({...marketingInfo, [event.target.id]: event.target.value})
        // console.log(businessInfo.business_id)
    //     const getBusinessInfo = async() => {
    //         const response = await axios.get('http://localhost:8001/business/')
    //         // setBusinessInfo({...businessInfo, business_id: response.data[response.data.length-1].id})
    //         console.log(response.data)
    //     }
    //     getBusinessInfo()
    }

    const handleWebsiteChange = (event) => {
        const handleChangeAPI = async() => {
            setMarketingInfo({...marketingInfo, [event.target.id]: event.target.value})
            setUrl(event.target.value)
            console.log(url)
            const response = await axios.put(`http://localhost:4000/getinfo`, url= url)
        }
        handleChangeAPI()
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(marketingInfo)
        // sendWebsite(e)
        // if ((parseInt(marketingInfo.items_sold) / parseInt(marketingInfo.revenue)) > 1){
        //     setABCRating('C')
        // } else if (0< (parseInt(marketingInfo.items_sold) / parseInt(marketingInfo.revenue)) < 1){
        //     setABCRating('B')
        // } else {
        //     setABCRating('A')
        // }
        // setSpendingInfo({...spendingInfo, business_id: businessInfo.id})
        // const response = await axios.get(`http://localhost:8000/business/${businessInfo.id}/spendingdata`)
        // let spendingInfoAsString = JSON.stringify(response.data)
        // localStorage.setItem('spendingInfo', spendingInfoAsString)
        const postMarketingData = async() => {
            try{
                const response2 = await axios.post(`http://localhost:8000/business/${businessInfo.id}/marketingdata/`, marketingInfo)  
            } catch(e){
                console.log(e.response.data)
            }
        }
        setTimeout(postMarketingData, 500)
    }

    // const resetBusiness = () => {
    //     const getBusinessInfo = async() => {
    //         const response = await axios.get(`http://localhost:8000/business/`)
    //             setBusinessInfo(response.data[response.data.length-1])
    //             console.log(businessInfo)
    //     }
    //     getBusinessInfo()
    // }

    // useEffect(()=>{
    //     getWebsite()
    // },[])

    // const sendWebsite = async(e) => {
    //     e.preventDefault()
    //     await axios.post('http://localhost:4000/getinfo', {url: url})
    // }

    // const getWebsite = async() => {
    //     const response = await axios.get('http://localhost:4000/getinfo')
    //     setInfo(response.data)
    // }

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

    // const marketingChart = new Chart('marketingChart', {
    //     type: 'bar',
    //     data: {
    //         labels: ['Target Age' , 'Percentage Female', 'Target State'],
    //         datasets: [1,2,3]
    //         // datasets: [marketingInfo.average_target_age, marketingInfo.percent_women, marketingInfo.target_state],
    //     }
    // })

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
                {/* <button>Total Items</button>
                <button>Add Items</button> */}
                <div className="data-inputs">
                    <div className="data-input-column">
                        <h1>SEO Data</h1>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="website" onChange={handleWebsiteChange} placeholder="Website URL"/>
                        </div>
                    </div>
                    <div className="data-input-column">
                        <h1>Social Media Data</h1>
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
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="displayed-data" 
            style={{display: dataDisplay}}
            >
                <div className='displayed-data-container'>
                    <div className="displayed-data-left">
                        {/* <Bar data={marketingInfo.average_target_age}/> */}
                        <h4>Website: {marketingInfo.website}</h4>
                        <h2>{info}</h2>
                    </div>
                    <div className="displayed-data-right">
                        {/* <h4>Average Customer Age or Target Age: {marketingInfo.average_target_age}</h4>
                        <h4>Percent Women Customers or Target Goal: {marketingInfo.percent_women}</h4>
                        <h4>Average State Customer Lives in Or Custom State: {marketingInfo.target_state}</h4> */}
                        {/* {marketingChart} */}
                    </div>
                </div>
            </div>
            <div className="displayed-analysis" 
            style={{display: SEOAnalysisDisplay}}
            >
                {/* <h4>Gross Margin Return on Investment: {GMROI}</h4> */}
                <h4>SEO Analysis </h4>
                {/* <h4>Cash Conversion Cycle: {CCC}</h4>
                <h4>Days Sales of Inventory: {DSI}</h4>
                <h4>Days Payable Outstanding: {DPO}</h4>
                <h4>Days Sales Outstanding: {DSO}</h4>
                <h4>Inventory Service Accuracy: {ISA}</h4>
                <h4>ABC Analysis: {ABC} and is therefore a/an {ABCRating} item</h4>
                <h4>Reorder Point: {ROP}</h4>
                <h4>Freight Bill Accuracy: {FBA}</h4>  */}
            </div>
            <div className="displayed-recommendations" style={{display: SEORecommendationsDisplay}}>
                <h1>SEO Recommendations</h1>
                {/* <p>You should place an order every time you have {ROP} {spendingInfo.item}s left</p>
                <p>You should order around {EOQ} items every time as that is your Economic Order Quantity</p>
                <p>You should prioritize the quality of all of your A items</p>
                <p>{DSIRec}</p>
                <p>{DPORec}</p>
                <p>{DSORec}</p>
                <p>{FBARec}</p> */}
            </div>
            <div className="displayed-recommendations" style={{display: socialMediaRecommendationsDisplay}}>
                <h1>Social Media Recommendations</h1>
                <p>Based on your current or target customer demographics, we recommend to prioritize marketing on {TotalRec}, however the more social media sites you can market on the better.</p>
                <p>We would also recommend, based on your industry, that you also focus on {IndustryRec1}, {IndustryRec2}, and {IndustryRec3}.</p>
                <p>We also recommend that you utilize social media, especially the sites mentioned above, to educate your audience, produce different kinds of content, look for micro-influencers, as well as try stories and live streaming.</p>
                <p>Also look for businesses similar to yours that are popular and see what they are posting. This can be very important for social media growth.</p>
            </div>
        </div>
    )
}