import { Link } from "react-router-dom"
import UserContext from "../UserContext"
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import BarChart from "./BarChart"
import PieChart from "./PieChart"
export default function ESGMetrics(){

    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const [Response, setResponse] = useState(null)
    const [inputDisplay, setInputDisplay] = useState('none')
    const [dataDisplay, setDataDisplay] = useState('none')
    const [GHGAssessmentDisplay, setGHGAssessmentDisplay] = useState('none')
    const [environmentalRecommendationsDisplay, setEnvironmentalRecommendationsDisplay] = useState('none')
    const [workerRecommendationsDisplay, setWorkerRecommendationsDisplay] = useState('none')

    let GHGAssessmentInitialState = {
        business_id:businessInfo.id,
        business_name:businessInfo.business_name,
        data_title:'ghgassessment',
        electricity_from_locations: '',
        electricity_from_factories: '',
        average_employee_commute_in_miles: '',
        employee_count: '',
        average_business_trip_commute_in_miles: '',
        total_business_trips: '',
        total_shipments: '',
        average_shipment_vehicle_type: '',
        total_miles_shipped: '',
        total_water_consumption_in_gallons: '',
        pounds_of_plastic_used: '',
        pounds_of_cardboard_used: '',
        pounds_of_wood_used: '',
        pounds_of_paper_used: '',
        pounds_of_metal_used: '',
        pounds_of_styrofoam_used: '',
        pounds_of_tetrapaks_used: '',
        pounds_of_glass_used: '',
        pounds_of_aluminumfoil_used: '',
        pounds_of_petplastic_used: '',
        pounds_of_hdpeplastic_used: '',
        pounds_of_ldpeplastic_used: '',
        pounds_of_palmoil_used: '',
        pounds_of_soybeans_used: '',
        pounds_of_beef_used: '',
        pounds_of_rubber_used: '',
        pounds_of_cocoa_used: '',
        other_material_waste_in_pounds: '',
        other_food_waste_in_pounds: ''
    }

    // let spendingInfoFromStorage = JSON.parse(localStorage.getItem('spendingInfo'))
    const [ghgAssessmentInfo, setGHGAssessmentInfo] = useState(GHGAssessmentInitialState)

    let newGHGAssessmentInfoArray = []
    let newGHGAssessmentInfoKeys = []
    const [ghgAssessmentInfoArray, setGHGAssessmentInfoArray] = useState(Object.values(ghgAssessmentInfo))
    const [userData, setUserData] = useState({
        labels: ['electricity_from_locations','electricity_from_factories','average_employee_commute_in_miles','employee_count','average_business_trip_commute_in_miles','total_business_trips','total_shipments','average_shipment_vehicle_type','total_miles_shipped','total_water_consumption_in_gallons','pounds_of_plastic_used','pounds_of_cardboard_used','pounds_of_wood_used','pounds_of_paper_used','pounds_of_metal_used','pounds_of_styrofoam_used','pounds_of_tetrapaks_used','pounds_of_glass_used','pounds_of_aluminumfoil_used','pounds_of_petplastic_used','pounds_of_hdpeplastic_used','pounds_of_ldpeplastic_used','pounds_of_palmoil_used','pounds_of_soybeans_used','pounds_of_beef_used','pounds_of_rubber_used','pounds_of_cocoa_used','other_material_waste_in_pounds','other_food_waste_in_pounds'],
        datasets: [
            {
                data: ghgAssessmentInfoArray.map(data=>parseFloat(data)),
                backgroundColor: [
                    '#418EEB',
                    '#A0C6F5',
                    'white'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })

    const handleChange = (event) => {
        console.log(businessInfo.id)
        setGHGAssessmentInfo({...ghgAssessmentInfo, [event.target.id]: event.target.value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        console.log(ghgAssessmentInfo)
        const postGHGAssessmentData = async() => {
            try{
                const response2 = await axios.post(`http://localhost:8000/business/${businessInfo.id}/ghgassessmentdata/`, ghgAssessmentInfo)  
            } catch(e){
                console.log(e.response.data)
            }
        }
        setTimeout(postGHGAssessmentData, 500)

        setUserData({
            labels: ['electricity_from_locations','electricity_from_factories','average_employee_commute_in_miles','employee_count','average_business_trip_commute_in_miles','total_business_trips','total_shipments','average_shipment_vehicle_type','total_miles_shipped','total_water_consumption_in_gallons','pounds_of_plastic_used','pounds_of_cardboard_used','pounds_of_wood_used','pounds_of_paper_used','pounds_of_metal_used','pounds_of_styrofoam_used','pounds_of_tetrapaks_used','pounds_of_glass_used','pounds_of_aluminumfoil_used','pounds_of_petplastic_used','pounds_of_hdpeplastic_used','pounds_of_ldpeplastic_used','pounds_of_palmoil_used','pounds_of_soybeans_used','pounds_of_beef_used','pounds_of_rubber_used','pounds_of_cocoa_used','other_material_waste_in_pounds','other_food_waste_in_pounds'],
            datasets: [
                {
                    data: ghgAssessmentInfoArray.map(data=>parseFloat(data)),
                    backgroundColor: [
                        '#418EEB',
                        '#A0C6F5',
                        'white'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
    }

    useEffect(()=>{
        const getGHGAssessmentInfo = async() => {
            const response = await axios.get(`http://localhost:8000/business/${businessInfo.id}/ghgassessmentdata`)
            setGHGAssessmentInfo(response.data[response.data.length-1])
        }
        const getBusinessInfo = async() => {
            const response = await axios.get(`http://localhost:8000/business/`)
                setBusinessInfo(response.data[response.data.length-1])
                console.log(businessInfo)
            if (businessInfo === response.data[response.data.length-1]){
                getGHGAssessmentInfo()
            }
        }
        getBusinessInfo()
    },[])

    const changeInputDisplay = (event) => {
        if(inputDisplay === 'none'){
            setInputDisplay('block')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    
    const changeDataDisplay = (event) => {
        if(dataDisplay === 'none'){
            setDataDisplay('flex')
            setInputDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    const changeGHGAssessmentDisplay = (event) => {
        if(GHGAssessmentDisplay === 'none'){
            setGHGAssessmentDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    const changeEnvironmentalRecommendationsDisplay = (event) => {
        if(environmentalRecommendationsDisplay === 'none'){
            setEnvironmentalRecommendationsDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setWorkerRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    const changeWorkerRecommendationsDisplay = (event) => {
        if(workerRecommendationsDisplay === 'none'){
            setWorkerRecommendationsDisplay('block')
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            for (let i = 0; i < 5; i++){
                document.querySelectorAll('.tab-button')[i].style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setGHGAssessmentDisplay('none')
            setEnvironmentalRecommendationsDisplay('none')
            setWorkerRecommendationsDisplay('none')
            event.target.style = 'font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    let SHIPMENTCO2e;
    let ELECTRICITYCO2e = (0.8523 * (ghgAssessmentInfo.electricity_from_locations + ghgAssessmentInfo.electricity_from_factories)).toString()
    let TRAVELCO2e = 0.313 * ((ghgAssessmentInfo.average_employee_commute_in_miles + ghgAssessmentInfo.employee_count + ghgAssessmentInfo.average_business_trip_commute_in_miles + ghgAssessmentInfo.total_business_trips)).toString()
    if (ghgAssessmentInfo.average_shipment_vehicle_type === 'Light-Duty Truck'){
        SHIPMENTCO2e= (0.467 * (ghgAssessmentInfo.total_shipments + ghgAssessmentInfo.total_miles_shipped)).toString()
    } else {
        SHIPMENTCO2e= (0.170 * (ghgAssessmentInfo.total_shipments + ghgAssessmentInfo.total_miles_shipped)).toString()
    }
    
    let WASTECO2e = ((0.02 * ghgAssessmentInfo.pounds_of_plastic_used / 2.2046) + (0.55 * ghgAssessmentInfo.pounds_of_cardboard_used / 2.2046) + (0.17 * ghgAssessmentInfo.pounds_of_wood_used / 2.2046) + (0.80 * ghgAssessmentInfo.pounds_of_paper_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_metal_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_styrofoam_used / 2.2046) + (0.4511 * ghgAssessmentInfo.pounds_of_tetrapaks_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_glass_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_aluminumfoil_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_petplastic_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_hdpeplastic_used / 2.2046) + (0.02 * ghgAssessmentInfo.pounds_of_ldpeplastic_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_palmoil_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_soybeans_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_beef_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_rubber_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_cocoa_used / 2.2046) + (0.15 * ghgAssessmentInfo.other_material_waste_in_pounds / 2.2046) + (0.58 * ghgAssessmentInfo.other_food_waste_in_pounds / 2.2046)).toString()
    // times waste type
    let WATERCONSUMPTIONCO2e = ghgAssessmentInfo.total_water_consumption_in_gallons
    let MATERIALSCO2e = ((2.2 * ghgAssessmentInfo.pounds_of_plastic_used / 2.2046) + (0.32 * ghgAssessmentInfo.pounds_of_cardboard_used / 2.2046) + (0.5 * ghgAssessmentInfo.pounds_of_wood_used / 2.2046) + (0.32 * ghgAssessmentInfo.pounds_of_paper_used / 2.2046) + (1.45 * ghgAssessmentInfo.pounds_of_metal_used / 2.2046) + (2 * ghgAssessmentInfo.pounds_of_styrofoam_used / 2.2046) + (0.4 * ghgAssessmentInfo.pounds_of_tetrapaks_used / 2.2046) + (0.75 * ghgAssessmentInfo.pounds_of_glass_used / 2.2046) + (0.3 * ghgAssessmentInfo.pounds_of_aluminumfoil_used / 2.2046) + (1.8 * ghgAssessmentInfo.pounds_of_petplastic_used / 2.2046) + (1.7 * ghgAssessmentInfo.pounds_of_hdpeplastic_used / 2.2046) + (1.6 * ghgAssessmentInfo.pounds_of_ldpeplastic_used / 2.2046) + (2.6 * ghgAssessmentInfo.pounds_of_palmoil_used / 2.2046) + (1.8 * ghgAssessmentInfo.pounds_of_soybeans_used / 2.2046) + (27 * ghgAssessmentInfo.pounds_of_beef_used / 2.2046) + (2.2 * ghgAssessmentInfo.pounds_of_rubber_used / 2.2046) + (1.2 * ghgAssessmentInfo.pounds_of_cocoa_used / 2.2046)).toString()
    let EmployeeTravelCO2e = (0.313 * (ghgAssessmentInfo.average_employee_commute_in_miles + ghgAssessmentInfo.employee_count)).toString()
    let WorkerTravelCO2e = (0.313 * (ghgAssessmentInfo.average_business_trip_commute_in_miles + ghgAssessmentInfo.total_business_trips)).toString()
    let plasticUsed = ((0.02 * ghgAssessmentInfo.pounds_of_plastic_used / 2.2046) + (2.2 * ghgAssessmentInfo.pounds_of_plastic_used / 2.2046)).toString()
    let cardboardUsed = ((0.55 * ghgAssessmentInfo.pounds_of_cardboard_used / 2.2046) + (0.32 * ghgAssessmentInfo.pounds_of_cardboard_used / 2.2046)).toString()
    let woodUsed = ((0.17 * ghgAssessmentInfo.pounds_of_wood_used / 2.2046) + (0.5 * ghgAssessmentInfo.pounds_of_wood_used / 2.2046)).toString()
    let paperUsed = ((0.80 * ghgAssessmentInfo.pounds_of_paper_used / 2.2046) + (0.32 * ghgAssessmentInfo.pounds_of_paper_used / 2.2046)).toString()
    let metalUsed = ((0.02 * ghgAssessmentInfo.pounds_of_metal_used / 2.2046) + (1.45 * ghgAssessmentInfo.pounds_of_metal_used / 2.2046)).toString()
    let styrofoamUsed = ((0.02 * ghgAssessmentInfo.pounds_of_styrofoam_used / 2.2046) + (2 * ghgAssessmentInfo.pounds_of_styrofoam_used / 2.2046)).toString()
    let tetraPaksUsed = ((0.4511 * ghgAssessmentInfo.pounds_of_tetrapaks_used / 2.2046) + (0.4 * ghgAssessmentInfo.pounds_of_tetrapaks_used / 2.2046)).toString()
    let glassUsed = ((0.02 * ghgAssessmentInfo.pounds_of_glass_used / 2.2046) + (0.75 * ghgAssessmentInfo.pounds_of_glass_used / 2.2046)).toString()
    let aluminumFoilUsed = ((0.02 * ghgAssessmentInfo.pounds_of_aluminumfoil_used / 2.2046) + (0.3 * ghgAssessmentInfo.pounds_of_aluminumfoil_used / 2.2046)).toString()
    let PETPlasticUsed = ((0.02 * ghgAssessmentInfo.pounds_of_petplastic_used / 2.2046) + (1.8 * ghgAssessmentInfo.pounds_of_petplastic_used / 2.2046)).toString()
    let HDPEPlasticUsed = ((0.02 * ghgAssessmentInfo.pounds_of_hdpeplastic_used / 2.2046) + (1.7 * ghgAssessmentInfo.pounds_of_hdpeplastic_used / 2.2046)).toString()
    let LDPEPlasticUsed = ((0.02 * ghgAssessmentInfo.pounds_of_ldpeplastic_used / 2.2046) + (1.6 * ghgAssessmentInfo.pounds_of_ldpeplastic_used / 2.2046)).toString()
    let palmOilUsed = ((0.58 * ghgAssessmentInfo.pounds_of_palmoil_used / 2.2046) + (2.6 * ghgAssessmentInfo.pounds_of_palmoil_used / 2.2046)).toString()
    let soybeansUsed = ((0.58 * ghgAssessmentInfo.pounds_of_soybeans_used / 2.2046) + (1.8 * ghgAssessmentInfo.pounds_of_soybeans_used / 2.2046)).toString()
    let beefUsed = ((0.58 * ghgAssessmentInfo.pounds_of_beef_used / 2.2046) + (27 * ghgAssessmentInfo.pounds_of_beef_used / 2.2046)).toString()
    let rubberUsed = ((0.58 * ghgAssessmentInfo.pounds_of_rubber_used / 2.2046) + (0.58 * ghgAssessmentInfo.pounds_of_rubber_used / 2.2046)).toString()
    let cocoaUsed = ((0.58 * ghgAssessmentInfo.pounds_of_cocoa_used / 2.2046) + (1.2 * ghgAssessmentInfo.pounds_of_cocoa_used / 2.2046)).toString()
    let otherMaterialWaste = (0.15 * ghgAssessmentInfo.other_material_waste_in_pounds / 2.2046).toString()
    let otherFoodWaste = (0.58 * ghgAssessmentInfo.other_food_waste_in_pounds / 2.2046).toString()
    console.log(cocoaUsed)

    const [analysisData, setAnalysisData] = useState({
        labels: ['Total Pounds of CO2e Released from Electricity Used in Buildings and Factories','Total Pounds of CO2e Released from Travel','Pounds of CO2e is coming from in-house employees','Pounds of CO2e is coming from factory employees','Total CO2e Released from Shipping','Total Pounds of CO2e Released from Product Creation','Total Pounds of CO2e Released from Product Waste','Pounds of CO2e Released from the Total Lifecycle of Each Material','Pounds of CO2e From Plastic','Pounds of CO2e From Cardboard','Pounds of CO2e From Wood','Pounds of CO2e From Paper','Pounds of CO2e From Metal','Pounds of CO2e From Styrofoam','Pounds of CO2e From Tetra Paks','Pounds of CO2e From Glass','Pounds of CO2e From Aluminum Foil','Pounds of CO2e From PET Plastic','Pounds of CO2e From HDPE Plastic','Pounds of CO2e From LDPE Plastic','Pounds of CO2e From Palm Oil','Pounds of CO2e From Soybeans','Pounds of CO2e From Beef','Pounds of CO2e From Rubber','Pounds of CO2e From Cocoa'],
        
        datasets: [
            {
                data: ghgAssessmentInfoArray.map(data=>parseFloat(data)),
                backgroundColor: [
                    '#418EEB',
                    '#A0C6F5',
                    'white'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })

    const [electricityData, setElectricityData] = useState({
        labels: ['Total Pounds of CO2e Released from Electricity Used in Buildings and Factories','Average Total Pounds of CO2e Released from Electricity Used in Buildings and Factories'],
        datasets: [
            {
                data: [ELECTRICITYCO2e, 2000000],
                backgroundColor: [
                    '#418EEB',
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })

    const [shipmentData, setShipmentData] = useState({
        labels: ['Total CO2e Released from Shipping','Average Total CO2e Released from Shipping'],
        datasets: [
            {
                data: [SHIPMENTCO2e, 10000],
                backgroundColor: [
                    '#418EEB',
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })

    const [materialData, setMaterialData] = useState({
        labels: ['Pounds of CO2e Released from the Total Lifecycle of Each Material','Average Pounds of CO2e Released from the Total Lifecycle of Each Material'],
        datasets: [
            {
                data: [MATERIALSCO2e, 2000000],
                backgroundColor: [
                    '#418EEB',
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    
    return (
        <div className="marketing">
            <h1 className="marketing-header">A Hub for All of Your Environmental, Social, and Governance Metrics</h1>
            <div className="tabs">
                <button className="tab-button marketing-tab" onClick={changeInputDisplay}>Data Inputs</button>
                <button className="tab-button marketing-tab" onClick={changeDataDisplay}>Data</button>
                <button className="tab-button marketing-tab" onClick={changeGHGAssessmentDisplay}>Greenhouse Gas Assessment</button>
                <button className="tab-button marketing-tab" onClick={changeEnvironmentalRecommendationsDisplay}>Sustainability Advice</button>
                <button className="tab-button marketing-tab" onClick={changeWorkerRecommendationsDisplay}>Ethical Sourcing and Fair Labor</button>
            </div>
            <div className="data" 
            style={{display: inputDisplay}}
            >
                <div className="data-inputs">
                    <div className="data-input-column">
                        <h1>Energy and Waste</h1>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="electricity_from_locations" onChange={handleChange} placeholder="Electricity Used By Business Locations (in kWh)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="electricity_from_factories" onChange={handleChange} placeholder="Electricity Used By Factories (in kWh)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="average_employee_commute_in_miles" onChange={handleChange} placeholder="Average Employee Commute (in miles)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="employee_count" onChange={handleChange} placeholder="Employee Count"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="average_business_trip_commute_in_miles" onChange={handleChange} placeholder="Average Business Trip Commute (in miles)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="total_business_trips" onChange={handleChange} placeholder="Total Business Trips"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="total_shipments" onChange={handleChange} placeholder="Total Shipments"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="average_shipment_vehicle_type" onChange={handleChange} placeholder="Average Shipment Vehicle Type"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="total_miles_shipped" onChange={handleChange} placeholder="Total Miles Shipped"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="total_water_consumption_in_gallons" onChange={handleChange} placeholder="Total Water Consumption (in gallons)"/>
                        </div>
                    </div>
                    <div className="data-input-column">
                        <h1>Materials</h1>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_plastic_used" onChange={handleChange} placeholder="Pounds of Plastic Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_cardboard_used" onChange={handleChange} placeholder="Pounds of Cardboard Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_wood_used" onChange={handleChange} placeholder="Pounds of Wood Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_paper_used" onChange={handleChange} placeholder="Pounds of Paper Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_metal_used" onChange={handleChange} placeholder="Pounds of Metal Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_styrofoam_used" onChange={handleChange} placeholder="Pounds of Styrofoam Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_tetrapaks_used" onChange={handleChange} placeholder="Pounds of Tetra Paks Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_glass_used" onChange={handleChange} placeholder="Pounds of Glass Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_aluminumfoil_used" onChange={handleChange} placeholder="Pounds of Aluminum Foil Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_petplastic_used" onChange={handleChange} placeholder="Pounds of PET Plastic Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_hdpeplastic_used" onChange={handleChange} placeholder="Pounds of HDPE Plastic Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_ldpeplastic_used" onChange={handleChange} placeholder="Pounds of LDPE Plastic Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_palmoil_used" onChange={handleChange} placeholder="Pounds of Palm Oil Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_soybeans_used" onChange={handleChange} placeholder="Pounds of Soybeans Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_beef_used" onChange={handleChange} placeholder="Pounds of Beef Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_rubber_used" onChange={handleChange} placeholder="Pounds of Rubber Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="pounds_of_cocoa_used" onChange={handleChange} placeholder="Pounds of Cocoa Used"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="other_material_waste_in_pounds" onChange={handleChange} placeholder="Other Material Waste (in pounds)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="other_food_waste_in_pounds" onChange={handleChange} placeholder="Other Material Waste (in pounds)"/>
                        </div>
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="displayed-data" 
            style={{display: dataDisplay}}
            >
                <div className='displayed-data-container'>
                    <div className="displayed-data-group">
                        <h1 className="tab-header">Data</h1>
                        <h4 className='data-item'>Electricity Used in Business Locations: {ghgAssessmentInfo.electricity_from_locations} kWh</h4>
                        <h4 className='data-item'>Electricity Used By Factories: {ghgAssessmentInfo.electricity_from_factories} kWh</h4>
                        <h4 className='data-item'>Average Employee Commute: {ghgAssessmentInfo.average_employee_commute_in_miles} miles</h4>
                        <h4 className='data-item'>Employee Count: {ghgAssessmentInfo.employee_count}</h4>
                        <h4 className='data-item'>Average Business Trip Commute: {ghgAssessmentInfo.average_business_trip_commute_in_miles} miles</h4>
                        <h4 className='data-item'>Total Business Trips: {ghgAssessmentInfo.total_business_trips}</h4>
                        <h4 className='data-item'>Total Shipments: {ghgAssessmentInfo.total_shipments}</h4>
                        <h4 className='data-item'>Average Shipment Vehicle Type: {ghgAssessmentInfo.average_shipment_vehicle_type}</h4>
                        <h4 className='data-item'>Total Miles Shipped: {ghgAssessmentInfo.total_miles_shipped}</h4>
                        <h4 className='data-item'>Total Waste in Pounds: {ghgAssessmentInfo.total_waste_in_pounds}</h4>
                        <h4 className='data-item'>Main Waste Type: {ghgAssessmentInfo.main_waste_type}</h4>
                        <h4 className='data-item'>Total Water Consumption: {ghgAssessmentInfo.total_water_consumption_in_gallons} gallons</h4>
                        <h4 className='data-item'>Plastic Used: {ghgAssessmentInfo.pounds_of_plastic_used} pounds</h4>
                        <h4 className='data-item'>Cardboard Used: {ghgAssessmentInfo.pounds_of_cardboard_used} pounds</h4>
                        <h4 className='data-item'>Wood Used: {ghgAssessmentInfo.pounds_of_wood_used} pounds</h4>
                        <h4 className='data-item'>Paper Used: {ghgAssessmentInfo.pounds_of_paper_used} pounds</h4>
                        <h4 className='data-item'>Metal Used: {ghgAssessmentInfo.pounds_of_metal_used} pounds</h4>
                        <h4 className='data-item'>Styrofoam Used: {ghgAssessmentInfo.pounds_of_styrofoam_used} pounds</h4>
                        <h4 className='data-item'>Tetra Paks Used: {ghgAssessmentInfo.pounds_of_tetrapaks_used} pounds</h4>
                        <h4 className='data-item'>Glass Used: {ghgAssessmentInfo.pounds_of_glass_used} pounds</h4>
                        <h4 className='data-item'>Aluminum Foil Used: {ghgAssessmentInfo.pounds_of_aluminumfoil_used} pounds</h4>
                        <h4 className='data-item'>PET Plastic Used: {ghgAssessmentInfo.pounds_of_petplastic_used} pounds</h4>
                        <h4 className='data-item'>HDPE Plastic Used: {ghgAssessmentInfo.pounds_of_hdpeplastic_used} pounds</h4>
                        <h4 className='data-item'>LDPE Plastic Used: {ghgAssessmentInfo.pounds_of_ldpeplastic_used} pounds</h4>
                        <h4 className='data-item'>Palm Oil Used: {ghgAssessmentInfo.pounds_of_palmoil_used} pounds</h4>
                        <h4 className='data-item'>Soybeans Used: {ghgAssessmentInfo.pounds_of_soybeans_used} pounds</h4>
                        <h4 className='data-item'>Beef Used: {ghgAssessmentInfo.pounds_of_beef_used} pounds</h4>
                        <h4 className='data-item'>Rubber Used: {ghgAssessmentInfo.pounds_of_rubber_used} pounds</h4>
                        <h4 className='data-item'>Cocoa Used: {ghgAssessmentInfo.pounds_of_cocoa_used} pounds</h4>
                        <h4 className='data-item'>CO2e Released from Waste of Other Materials: {otherMaterialWaste}</h4>
                        <h4 className='data-item'>CO2e Released from Waste of Other Food:{otherFoodWaste}</h4>
                    </div>
                </div>
            </div>
            <div className="displayed-analysis" 
            style={{display: GHGAssessmentDisplay}}
            >
                <h1 className="tab-header">GHG Assessment </h1>
                <PieChart chartData={analysisData}/>
                {/* <h4>Total Pounds of CO2e Released from Electricity Used in Buildings and Factories: {ELECTRICITYCO2e}</h4>
                <h4>Total Pounds of CO2e Released from Travel: {TRAVELCO2e}</h4>
                <h5>{EmployeeTravelCO2e} Pounds of CO2e is coming from in-house employees</h5>
                <h5>{WorkerTravelCO2e} Pounds of CO2e is coming from factory employees</h5>
                <h4>Total CO2e Released from Shipping: {SHIPMENTCO2e}</h4>
                <h4>Total Pounds of CO2e Released from Product Creation: {MATERIALSCO2e}</h4>
                <h4>Total Pounds of CO2e Released from Product Waste: {WASTECO2e}</h4>
                <h2>Pounds of CO2e Released from the Total Lifecycle of Each Material:</h2>
                <p>Plastic: {plasticUsed} Pounds of CO2e</p>
                <p>Cardboard: {cardboardUsed} Pounds of CO2e</p>
                <p>Wood: {woodUsed} Pounds of CO2e</p>
                <p>Paper: {paperUsed} Pounds of CO2e</p>
                <p>Metal: {metalUsed} Pounds of CO2e</p>
                <p>Styrofoam: {styrofoamUsed} Pounds of CO2e</p>
                <p>Tetra Paks: {tetraPaksUsed} Pounds of CO2e</p>
                <p>Glass: {glassUsed} Pounds of CO2e</p>
                <p>Aluminum Foil: {aluminumFoilUsed} Pounds of CO2e</p>
                <p>PET Plastic: {PETPlasticUsed} Pounds of CO2e</p>
                <p>HDPE Plastic: {HDPEPlasticUsed} Pounds of CO2e</p>
                <p>LDPE Plastic: {LDPEPlasticUsed} Pounds of CO2e</p>
                <p>Palm Oil: {palmOilUsed} Pounds of CO2e</p>
                <p>Soybeans: {soybeansUsed} Pounds of CO2e</p>
                <p>Beef: {beefUsed} Pounds of CO2e</p>
                <p>Rubber: {rubberUsed} Pounds of CO2e</p>
                <p>Cocoa: {cocoaUsed} Pounds of CO2e</p> */}
            </div>
            <div className="displayed-recommendations" style={{display: environmentalRecommendationsDisplay}}>
                <h1 className="tab-header">Environmental Recommendations</h1>
                <div className="environmental-recommendations-container">
                    <div class-name='environmental-chart'>
                        <BarChart chartData={electricityData}/>
                    </div>
                    <div class-name='environmental-chart'>
                        <BarChart chartData={shipmentData}/>
                    </div>
                    <div class-name='environmental-chart'>
                        <BarChart chartData={materialData}/>
                    </div>
                    <p className="recommendation">Note how you compare to the average emission. Also take a look at the greenhouse gas assessment and see what's taking up the bulk of your emissions. Prioritize bioplastics and/or the ingredients not in the survey list if you can.</p>
                </div>
            </div>
            <div className="displayed-recommendations" style={{display: workerRecommendationsDisplay}}>
                <h1 className="tab-header">Ethical Sourcing and Labor Recommendations</h1>
                <p className="recommendation">Your supply chain is very long and indirect. Making sure that all levels of the supply chain are treated fairly can be hard, but is very important.</p>
                <p className="recommendation">Try segmenting out your supply chain into pieces to easily isolate what needs to be improved.</p>
            </div>
        </div>
    )
}