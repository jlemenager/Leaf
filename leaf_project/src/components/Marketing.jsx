import { Link } from "react-router-dom"
import UserContext from "../UserContext"
import { useState, useEffect, useContext } from 'react'
// import screenshot from '../images/website.png'
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
        industry_rec: '',
        website: ''
    }
    const [marketingInfo, setMarketingInfo] = useState(marketingInitialState)
    const [url, setUrl] = useState('')
    const [info, setInfo] = useState('')
    const [h1count, setH1Count] = useState('')
    const [keywordAnalysis, setKeywordAnalysis] = useState('')
    const [keyword1, setKeyword1] = useState('')
    let keywordRating1 = ''
    let ahrefsBacklinkRec1 = ''
    let ahrefsKeywordDifficulty1 = ''
    let totalVolume1 = ''
    let keyword2 = ''
    let keywordRating2 = ''
    let ahrefsBacklinkRec2 = ''
    let ahrefsKeywordDifficulty2 = ''
    let totalVolume2 = ''
    let keyword3 = ''
    let keywordRating3 = ''
    let ahrefsBacklinkRec3 = ''
    let ahrefsKeywordDifficulty3 = ''
    let totalVolume3 = ''
    let keyword4 = ''
    let keywordRating4 = ''
    let ahrefsBacklinkRec4 = ''
    let ahrefsKeywordDifficulty4 = ''
    let totalVolume4 = ''
    let keyword5 = ''
    let keywordRating5 = ''
    let ahrefsBacklinkRec5 = ''
    let ahrefsKeywordDifficulty5 = ''
    let totalVolume5 = ''
    let keyword6 = ''
    let keywordRating6 = ''
    let ahrefsBacklinkRec6 = ''
    let ahrefsKeywordDifficulty6 = ''
    let totalVolume6 = ''
    let keyword7 = ''
    let keywordRating7 = ''
    let ahrefsBacklinkRec7 = ''
    let ahrefsKeywordDifficulty7 = ''
    let totalVolume7 = ''
    let keyword8 = ''
    let keywordRating8 = ''
    let ahrefsBacklinkRec8 = ''
    let ahrefsKeywordDifficulty8 = ''
    let totalVolume8 = ''
    let keyword9 = ''
    let keywordRating9 = ''
    let ahrefsBacklinkRec9 = ''
    let ahrefsKeywordDifficulty9 = ''
    let totalVolume9 = ''
    let keyword10 = ''
    let keywordRating10 = ''
    let ahrefsBacklinkRec10 = ''
    let ahrefsKeywordDifficulty10 = ''
    let totalVolume10 = ''
    let keyword11 = ''
    let keywordRating11 = ''
    let ahrefsBacklinkRec11 = ''
    let ahrefsKeywordDifficulty11 = ''
    let totalVolume11 = ''
    let keyword12 = ''
    let keywordRating12 = ''
    let ahrefsBacklinkRec12 = ''
    let ahrefsKeywordDifficulty12 = ''
    let totalVolume12 = ''
    let keyword13 = ''
    let keywordRating13 = ''
    let ahrefsBacklinkRec13 = ''
    let ahrefsKeywordDifficulty13 = ''
    let totalVolume13 = ''
    let keyword14 = ''
    let keywordRating14 = ''
    let ahrefsBacklinkRec14 = ''
    let ahrefsKeywordDifficulty14 = ''
    let totalVolume14 = ''
    let keyword15 = ''
    let keywordRating15 = ''
    let ahrefsBacklinkRec15 = ''
    let ahrefsKeywordDifficulty15 = ''
    let totalVolume15 = ''
    let keyword16 = ''
    let keywordRating16 = ''
    let ahrefsBacklinkRec16 = ''
    let ahrefsKeywordDifficulty16 = ''
    let totalVolume16 = ''
    let keyword17 = ''
    let keywordRating17 = ''
    let ahrefsBacklinkRec17 = ''
    let ahrefsKeywordDifficulty17 = ''
    let totalVolume17 = ''
    let keyword18 = ''
    let keywordRating18 = ''
    let ahrefsBacklinkRec18 = ''
    let ahrefsKeywordDifficulty18 = ''
    let totalVolume18 = ''
    let keyword19 = ''
    let keywordRating19 = ''
    let ahrefsBacklinkRec19 = ''
    let ahrefsKeywordDifficulty19 = ''
    let totalVolume19 = ''
    const [imagePath, setImagePath] = useState('https://images.pexels.com/photos/17463091/pexels-photo-17463091/free-photo-of-lightning-bolt-in-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')
    
    let newMarketingInfoArray = []
    let newMarketingInfoKeys = []
    const [marketingInfoArray, setMarketingInfoArray] = useState(Object.values(marketingInfo))
    const [userData, setUserData] = useState({
        labels: ['target age','percent women'],
        datasets: [
            {
                data: [1, 2],
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
                const response2 = await axios.post(`https://leaf-database-production.up.railway.app/business/${businessInfo.id}/marketingdata/`, marketingInfo)  
            } catch(e){
                console.log(e.response.data)
            }
        }
        setTimeout(postMarketingData, 500)
        console.log(marketingInfoArray)
        setUserData({
            labels: ['target age','percent women'],
            datasets: [
                {
                    data: [parseFloat(marketingInfo.average_target_age),parseFloat(marketingInfo.percent_women)],
                    backgroundColor: [
                        '#A0C6F5'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        
        const getScrapedData = async() => {
            const response = await axios.post(`http://leaf-scraper-production.up.railway.app/getinfo/`, {url: url})
            setInfo(JSON.stringify(response.data))
            if(info.length >= 5){
                setH1Count('Great job! You are using over 4 h1s!')
            } else {
                setH1Count('Try using more h1s!')
            } if (marketingInfo.industry_rec === 'Hotel Industry' && info.includes('airbnb' || 'expedia' || 'vrbo' || 'air bnb' || 'hotels' || 'costo travel' || 'marriot' || 'booking' || 'great wolf lodge' || 'hilton' || 'marriot bonvoy' || 'hilton honors' || 'hyatt' || 'choice hotels' || 'trivago' || 'ihg' || 'booking.com' || 'wyndham' || 'best western' || 'hotels.com' || 'motel' || 'cheap hotels' || 'booking hotel' || 'last minute hotel deals' || 'last minute hotels' || 'hotele' || 'hotel booking' || 'hotell' || 'hoteles baratos' || 'hotel deals' || 'boutique hotel' || 'pet friendly hotels' || 'hotel pas cher' || 'hotel room' || 'luxury hotels' || 'hotely' || 'cheap motels' || '5 star hotels' || 'hotel motel' || 'hotelsuche' || 'hotel buchen' || 'extended stay hotels')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
                if (info.includes('airbnb')){
                    setKeyword1('airbnb')
                    keywordRating1 = 'High Volume High Competition'
                    ahrefsBacklinkRec1 = 291
                    ahrefsKeywordDifficulty1 = 77
                    totalVolume1 = 7256700
                }
                if (info.includes('expedia')){
                    keyword2 = 'expedia'
                    keywordRating2 = 'High Volume High Competition'
                    ahrefsBacklinkRec2 = 329
                    ahrefsKeywordDifficulty2 = 79
                    totalVolume2 = 3190330
                }
                if (info.includes('vrbo')){
                    keyword3 = 'vrbo'
                    keywordRating3 = 'High Volume Medium Competition'
                    ahrefsBacklinkRec3 = 95
                    ahrefsKeywordDifficulty3 = 53
                    totalVolume3 = 1970730
                }
                if (info.includes('air bnb')){
                    keyword4 = 'air bnb'
                    keywordRating4 = 'High Volume High Competition'
                    ahrefsBacklinkRec4 = 835
                    ahrefsKeywordDifficulty4 = 91
                    totalVolume4 = 805660
                }
                if (info.includes('hotels')){
                    keyword5 = 'hotels'
                    keywordRating5 = 'High Volume High Competition'
                    ahrefsBacklinkRec5 = 5256
                    ahrefsKeywordDifficulty5 = 99
                    totalVolume5 = 760250 
                }
                if (info.includes('costco travel')){
                    keyword6 = 'costco travel'
                    keywordRating6 = 'High Volume Medium-Low Competition'
                    ahrefsBacklinkRec6 = 32
                    ahrefsKeywordDifficulty6 = 27
                    totalVolume6 = 728330 
                }
                if (info.includes('marriott')){
                    keyword7 = 'marriott'
                    keywordRating7 = 'High Volume High Competition'
                    ahrefsBacklinkRec7 = 259
                    ahrefsKeywordDifficulty7 = 75
                    totalVolume7 = 656720
                }
                if (info.includes('booking')){
                    keyword8 = 'booking'
                    keywordRating8 = 'High Volume High Competition'
                    ahrefsBacklinkRec8 = 427
                    ahrefsKeywordDifficulty8 = 83
                    totalVolume8 = 511740
                }
                if (info.includes('great wolf lodge')){
                    keyword9 = 'great wolf lodge'
                    keywordRating9 = 'High Volume Medium Competition'
                    ahrefsBacklinkRec9 = 53
                    ahrefsKeywordDifficulty9 = 39
                    totalVolume9 = 456830
                }
                if (info.includes('hilton')){
                    keyword10 = 'hilton'
                    keywordRating10 = 'High Volume High Competition'
                    ahrefsBacklinkRec10 = 6109
                    ahrefsKeywordDifficulty10 = 88
                    totalVolume10 = 438090 
                }
                if (info.includes('marriott bonvoy')){
                    keyword11 = 'marriott bonvoy'
                    keywordRating11 = 'High Volume High Competition'
                    ahrefsBacklinkRec11 = 273
                    ahrefsKeywordDifficulty11 = 76
                    totalVolume11 = 420530
                }
                if (info.includes('hilton honors')){
                    keyword12 = 'hilton honors'
                    keywordRating12 = 'High Volume Medium Competition'
                    ahrefsBacklinkRec12 = 53
                    ahrefsKeywordDifficulty12 = 39
                    totalVolume12 = 369790 
                }
                if (info.includes('hyatt')){
                    keyword13 = 'hyatt'
                    keywordRating13 = 'High Volume High Competition'
                    ahrefsBacklinkRec13 = 167
                    ahrefsKeywordDifficulty13 = 66
                    totalVolume13 = 243540 
                }
                if (info.includes('choice hotels')){
                    keyword14 = 'choice hotels'
                    keywordRating14 = 'High Volume High Competition'
                    ahrefsBacklinkRec14 = 103
                    ahrefsKeywordDifficulty14 = 55
                    totalVolume14 = 242610 
                }
                if (info.includes('trivago')){
                    keyword15 = 'trivago'
                    keywordRating15 = 'High Volume Medium Competition'
                    ahrefsBacklinkRec15 = 68
                    ahrefsKeywordDifficulty15 = 45
                    totalVolume15 = 235130 
                }
                if (info.includes('ihg')){
                    keyword15 = 'ihg'
                    keywordRating15 = 'High Volume High Competition'
                    ahrefsBacklinkRec15 = 153
                    ahrefsKeywordDifficulty15 = 64
                    totalVolume15 = 231340 
                }
                if (info.includes('booking.com')){
                    keyword16 = 'booking.com'
                    keywordRating16 = 'High Volume High Competition'
                    ahrefsBacklinkRec16 = 524
                    ahrefsKeywordDifficulty16 = 86
                    totalVolume16 = 206410 
                }
                if (info.includes('wyndham')){
                    keyword17 = 'wyndham'
                    keywordRating17 = 'High Volume High Competition'
                    ahrefsBacklinkRec17 = 247
                    ahrefsKeywordDifficulty17 = 74
                    totalVolume17 = 206010
                }
                if (info.includes('best western')){
                    keyword18 = 'best western'
                    keywordRating18 = 'High Volume Medium Competition'
                    ahrefsBacklinkRec18 = 81
                    ahrefsKeywordDifficulty18 = 49
                    totalVolume18 = 202190
                }
                if (info.includes('hotels.com')){
                    keyword19 = 'hotels.com'
                    keywordRating19 = 'High Volume High Competition'
                    ahrefsBacklinkRec19 = 427
                    ahrefsKeywordDifficulty19 = 83
                    totalVolume19 = 156360
                }
            } else if (marketingInfo.industry_rec === 'Air Travel' && info.includes('american airlines' || 'southwest airlines' || 'united airlines' || 'spirit airlines' || 'delta' || 'delta airlines' || 'alaska airlines' || 'frontier airlines' || 'jetblue' || 'southwest' || 'cheapoair' || 'skyscanner' || 'allegiant' || 'american' || 'qatar airways' || 'aa' || 'united' || 'british airways' || 'allegiant air' || 'hawaiian airlines')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Ecommerce and Shopping' && info.includes('amazon' || 'ebay' || 'target' || 'walmart' || 'craigslist' || 'amazon prime' || 'costco' || 'etsy' || 'wayfair' || 'michaels' || 'prime video' || 'amazon prime video' || 'kohls' || 'bed bath and beyond' || 'barnes and noble' || 'ticketmaster' || 'qvc' || 'aliexpress' || "sam's club" || 'sams club' || 'tractor supply' || 'mercari' || 'amazon.com' || 'offerup' || 'poshmark' || 'prime gaming' || 'groupon' || 'sams' || 'offer up' || 'slickdeals' || 'prime video' || 'ps5' || 'nintendo switch' || 'xbox series x' || 'playstation 5' || 'prime gaming' || 'airpods pro' || 'prime' || 'kindle' || 'aws' || 'freevee' || 'kindle unlimited' || 'prime day' || 'prime video login' || 'primevideo' || 'home depot promo code' || 'aws certification' || 'comixology' || 'aws console' || 'seller central' || 'online store' || 'online business' || 'ecom' || 'ecommerce website' || 'shopping cart' || 'e business' || 'what is ecommerce' || 'ecomerce' || 'comercio electronico' || 'e commerce definition' || 'ecommerce platforms' || 'e commerce business' || 'e commerce meaning' || 'ecommerce website design' || 'wordpress ecommerce' || 'e commerce sites' || 'ecommunity' || 'e commerce adalah' || 'ecommerce website development' || 'ecommerce website templates' || 'best ecommerce platform' || 'magento ecommerce' || 'free shopping cart' || 'ecommerce solutions' || 'ecommerce template')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Fashion' && info.includes('shein' || 'lululemon' || 'macys' || 'old navy' || 'nordstrom' || 'jcpenney' || 'nordstrom rack' || 'zara' || 'nike' || 'american eagle' || 'zappos' || 'asos' || 'urban outfitters' || 'banana republic' || 'victoria secret' || 'aerie' || "macy's" || 'abercrombie' || 'uniqlo' || 'anthropologie' || 'yeezy slides' || 'yeezy' || 'air force 1' || 'jordan 1' || 'lingerie' || 'jordans' || 'shoe stores near me' || 'cargo pants' || 'essentials hoodie' || 'air jordan 1' || 'shoes' || 'wedding guest dresses' || 'graphic tees' || 'dresses' || 'prom dresses' || 'snkrs' || "cocktail dresses" || 'white dress' || 'online thrift store' || 'graduation dresses' || 'womens clothes' || '80s fashion' || 'fashion designing' || 'fashion designer' || 'fashion blog' || 'mens fashion' || 'fashion designer games' || 'fashion house' || 'fashion show' || 'fashion week' || 'fashion tv' || 'new york fashion week' || 'fashion dresses' || 'fashion model' || 'fashion style' || 'fashion magazine' || 'korean fashion' || 'men fashion' || 'fashion 2016' || 'new fashion' || 'london fashion week' || 'fashion illustration' || 'fashion trends' || 'women fashion' || 'fashion accessory')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Banking, Credit, and Lending' && info.includes('paypal' || 'wells fargo' || 'bank of america' || 'credit karma' || 'chase' || 'capital one' || 'american express' || 'wells fargo login' || 'paypal login' || 'chase login' || 'venmo' || 'bank of america login' || 'us bank' || 'capital one login' || 'discover' || 'citibank' || "amex" || 'pnc' || 'bankofamerica' || 'discover card login')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Insurance' && info.includes('geico' || 'progressive' || 'usaa' || 'state farm' || 'kaiser permanente' || 'allstate' || 'kaiser' || 'aetna' || 'cigna' || 'united healthcare' || 'liberty mutual' || 'delta dental' || 'statefarm' || 'usaa login' || 'progressive login' || 'geico login' || "aetna login" || 'state farm login' || 'vsp' || 'optum' || 'renters insurance' || 'dental insurance' || 'fsa' || 'car insurance' || 'health insurance' || 'pet insurance' || 'insurance' || 'life insurance' || 'car insurance quotes' || 'affordable care act' || 'auto insurance' || 'insurance quotes' || 'home insurance' || 'kaiser covid testing' || 'homeowners insurance' || 'auto insurance quote' || "home insurance quotes" || 'cheap car insurance' || 'auto insurance quotes' || 'motorcycle insurance' || 'insurance companies' || 'cheap insurance' || 'public liability insurance' || 'car insurance companies' || 'insurance agents' || 'business insurance' || 'liability insurance' || 'insurance broker' || 'auto insurance companies' || 'commercial insurance' || 'professional indemnity insurance' || 'insurance policy' || 'insurance car' || 'workers compensation insurance' || 'professional liability insurance' || 'in company' || 'small business insurance')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Consumer Electronics' && info.includes('best buy' || 'apple' || 'bestbuy' || 'apple tv' || 'apple store' || 'samsung' || 'apple watch' || 'newegg' || 'guitar center' || 'boost mobile' || 'ipad' || 'roku' || 'iphone' || 'itunes' || 'apple music' || 'ring' || "hp" || 'crutchfield' || 'nest' || 'appletv' || 'ps5' || 'xbox series x' || 'iphone 13' || 'find my iphone' || 'iphone 13 pro max' || 'airpods' || 'ipad' || 'airpods pro' || 'iphone' || 'itunes' || 'macbook pro' || 'macbook air' || 'iphone se' || 'macbook' || 'ipad pro' || 'app store' || "ipad air" || 'appletv' || 'geek squad' || 'itunes download')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Health' && info.includes('cvs' || 'walgreens' || 'planet fitness' || 'bmi calculator' || 'quest diagnostics' || 'cvs pharmacy' || 'labcorp' || 'goodrx' || 'aarp games' || 'warby parker' || 'zenni' || 'pubmed' || 'express scripts' || 'myfitnesspal' || 'uworld' || 'weight watchers' || "uworld login")){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Pharmaceuticals' && info.includes('gabapentin' || 'ivermectin' || 'covid test' || 'paxlovid' || 'delta 8' || 'rapid covid testing near me' || 'doxycycline' || 'covid testing' || 'minute clinic' || 'binaxnow covid test' || 'covid rapid test' || 'binaxnow')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Logistics' && info.includes('usps tracking' || 'usps' || 'ups tracking' || 'fedex tracking' || 'ups' || 'fedex' || 'ups store' || 'fedex near me' || 'usps tracking number' || 'dhl tracking' || 'post office' || 'ups tracking number' || 'dhl' || 'fedex tracking number' || 'tracking number' || 'usps change of address' || "public storage" || 'informed delivery' || 'usps informed delivery' || 'pods' || 'usps careers' || 'extra space storage' || 'usps covid tests' || 'usps mail forwarding' || 'usps hold mail' || 'fedex printing' || 'fed ex tracking' || 'zip code lookup')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Restaurants' && info.includes('mexican restaurants' || 'italian restaurants' || 'steakhouse' || 'diner' || 'seafood restaurants' || 'vegan restaurants' || 'breakfast restaurants' || 'restaurant games' || 'places to eat' || 'seafood restaurants near me' || 'food around me' || 'steakhouse near me' || 'restaurant week' || 'greek restaurant')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else if (marketingInfo.industry_rec === 'Retail' && info.includes('retailmenot' || 'coupons' || 'retail me not' || 'retina' || 'voucher codes' || 'promo code' || 'retailer' || 'retahilas' || 'retail jobs' || 'retail link' || 'retail stores' || 'retail management' || 'what is retail' || 'retail news' || 'retail shops' || 'retail sales' || 'retail industry' || 'retail marketing' || 'retailnews' || 'retail comic' || 'retail business' || 'inretail' || 'retail manager' || 'retail company' || 'retail trade')){
                setKeywordAnalysis("You used at least one action-oriented keyword in your h1s, creating a call to action! That should boost your user experience.")
            } else {
                setKeywordAnalysis("You did not include a call to action word in any of your h1s.")
            }
            
        }
        getScrapedData()

        // setImagePath(screenshot)
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
    } else if(marketingInfo.target_state === 'Arizona' || marketingInfo.target_state === 'arizona' || marketingInfo.target_state === 'California' || marketingInfo.target_state === 'california' || marketingInfo.target_state === 'Florida' || marketingInfo.target_state === 'florida' || marketingInfo.target_state === 'Illinois'  || marketingInfo.target_state === 'illinois' || marketingInfo.target_state === 'Kansas' || marketingInfo.target_state === 'kansas' || marketingInfo.target_state === 'Michigan' || marketingInfo.target_state === 'michigan' || marketingInfo.target_state === 'Nebraska' || marketingInfo.target_state === 'Nebraska' || marketingInfo.target_state === 'New                                                          Mexico' || marketingInfo.target_state === 'new mexico' || marketingInfo.target_state === 'North Dakota' || marketingInfo.target_state === 'north dakota' || marketingInfo.target_state === 'Oklahoma' || marketingInfo.target_state === 'oklahoma' || marketingInfo.target_state === 'South Dakota' || marketingInfo.target_state === 'south dakota' || marketingInfo.target_state === 'Texas' || marketingInfo.target_state === 'texas' || marketingInfo.target_state === 'Washington' || marketingInfo.target_state === 'washington'){
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
                                <option value="Retail">Retail</option>
                                <option value="Hotel Industry">Hotel Industry</option>
                                <option value="Air Travel">Air Travel</option>
                                <option value="Ecommerce and Shopping">Ecommerce and Shopping</option>
                                <option value="Fashion">Fashion</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Banking, Credit, and Lending">Banking, Credit, and Lending</option>
                                <option value="Consumer Electronics">Consumer Electronics</option>
                                <option value="Health">Health</option>
                                <option value="Restaurants">Restaurants</option>
                                <option value="Pharmaceuticals">Pharmaceuticals</option>
                                <option value="Logistics">Logistics</option>
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
                        <h1 className="tab-header">Website: <span>{marketingInfo.website}</span></h1>
                        <h2 className="SEO-analysis">All Front-Page H1s: <span className='h1-list'>{info}</span></h2>
                        <h2 className="SEO-analysis">{h1count}</h2>
                        <h2 className="SEO-analysis">{keywordAnalysis}</h2>
                        <h2 className="SEO-analysis">Keywords Used:</h2>
                            <div className="keyword">
                        <p className="keyword-data">{keyword1}</p>
                        <p className="keyword-data">{keywordRating1}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating1}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty1}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec1}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword2}</p>
                        <p className="keyword-data">{keywordRating2}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating2}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty2}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec2}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword3}</p>
                        <p className="keyword-data">{keywordRating3}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating3}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty3}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec3}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword4}</p>
                        <p className="keyword-data">{keywordRating4}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating4}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty4}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec4}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword5}</p>
                        <p className="keyword-data">{keywordRating5}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating5}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty5}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec5}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword6}</p>
                        <p className="keyword-data">{keywordRating6}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating6}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty6}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec6}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword7}</p>
                        <p className="keyword-data">{keywordRating7}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating7}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty7}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec7}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword8}</p>
                        <p className="keyword-data">{keywordRating8}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating8}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty8}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec8}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword9}</p>
                        <p className="keyword-data">{keywordRating9}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating9}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty9}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec9}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword10}</p>
                        <p className="keyword-data">{keywordRating10}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating10}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty10}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec10}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword11}</p>
                        <p className="keyword-data">{keywordRating11}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating11}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty11}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec11}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword12}</p>
                        <p className="keyword-data">{keywordRating12}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating12}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty12}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec12}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword13}</p>
                        <p className="keyword-data">{keywordRating13}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating13}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty13}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec13}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword14}</p>
                        <p className="keyword-data">{keywordRating14}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating14}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty14}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec14}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword15}</p>
                        <p className="keyword-data">{keywordRating15}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating15}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty15}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec15}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword16}</p>
                        <p className="keyword-data">{keywordRating16}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating16}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty16}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec16}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword17}</p>
                        <p className="keyword-data">{keywordRating17}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating17}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty17}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec17}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword18}</p>
                        <p className="keyword-data">{keywordRating18}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating18}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty18}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec18}</p>
                            </div>
                            <div className="keyword">
                        <p className="keyword-data">{keyword19}</p>
                        <p className="keyword-data">{keywordRating19}</p>
                        <p className="keyword-data">Keyword Rating: {keywordRating19}</p>
                        <p className="keyword-data">Ahrefs Keyword Difficulty Rating: {ahrefsKeywordDifficulty19}</p>
                        <p className="keyword-data">Ahrefs Recommended Number of Backlinks to Appear in the Top 10 Search Results: {ahrefsBacklinkRec19}</p>
                            </div>
                        {/* <img src={imagePath} alt="" /> */}
                    </div>
                    <div className="displayed-data-right">
                    </div>
                </div>
            </div>
            <div className="displayed-analysis" 
            style={{display: SEOAnalysisDisplay}}
            >
                <h1 className="tab-header">SEO Analysis </h1>
                <p className='recommendation'>Recommendations to come...</p>
            </div>
            <div className="displayed-recommendations" style={{display: SEORecommendationsDisplay}}>
                <h1 className="tab-header">SEO Recommendations</h1>
                <p className='recommendation'>Recommendations to come...</p>
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