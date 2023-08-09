import { useState, useContext, useEffect } from "react"
import UserContext from "../UserContext"
import axios from 'axios'
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import PieChart from "./PieChart"

export default function Spending(){

    // Variables

    const { businessInfo, setBusinessInfo, spendingInfo, setSpendingInfo } = useContext(UserContext)
    const [ABCRating, setABCRating] = useState(null)
    const [inputDisplay, setInputDisplay] = useState('none')
    const [dataDisplay, setDataDisplay] = useState('none')
    const [analysisDisplay, setAnalysisDisplay] = useState('none')
    const [recommendationsDisplay, setRecommendationsDisplay] = useState('none')

    let spendingInitialState = {
        business_id:businessInfo.id,
        business_name:businessInfo.business_name,
        item:'', 
        items_sold:'',
        cogs:'',
        total_shipping_expense:'',
        number_in_inventory:'',
        cost_of_using_inventory:'',
        cost_of_order_picking:'',
        safety_stock:'',
        marketing_cost:'',
        outstanding_payments_to_suppliers:'',
        outstanding_payments_from_customers:'',
        revenue:'',
        average_lead_time_in_days:'',
        number_of_freight_bills:'',
        number_of_error_free_freight_bills:'',
        gross_profit_from_item:''
    }
    // let spendingInfoFromStorage = JSON.parse(localStorage.getItem('spendingInfo'))
    const [formState, setFormState] = useState(spendingInitialState)
     

    //HandleChange

    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value})
    }

    // Change Tabs

    const changeInputDisplay = (event) => {
        if(inputDisplay === 'none'){
            setInputDisplay('block')
            setDataDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            for (let i = 0; i < 4; i++){
                document.querySelectorAll('.tab-button')[i].style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            event.target.style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    
    const changeDataDisplay = (event) => {
        if(dataDisplay === 'none'){
            setDataDisplay('flex')
            setInputDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            for (let i = 0; i < 4; i++){
                document.querySelectorAll('.tab-button')[i].style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            event.target.style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }
    const changeAnalysisDisplay = (event) => {
        if(analysisDisplay === 'none'){
            setAnalysisDisplay('block')
            setDataDisplay('none')
            setInputDisplay('none')
            setRecommendationsDisplay('none')
            for (let i = 0; i < 4; i++){
                document.querySelectorAll('.tab-button')[i].style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            event.target.style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    const changeRecommendationsDisplay = (event) => {
        if(recommendationsDisplay === 'none'){
            setRecommendationsDisplay('block')
            setAnalysisDisplay('none')
            setDataDisplay('none')
            setInputDisplay('none')
            for (let i = 0; i < 4; i++){
                document.querySelectorAll('.tab-button')[i].style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
            }    
            event.target.style = 'background-color:#F5F9FE; border:3px solid #418EEB; border-style: none solid none solid; color: #418EEB;'
        } else {
            setInputDisplay('none')
            setDataDisplay('none')
            setAnalysisDisplay('none')
            setRecommendationsDisplay('none')
            event.target.style = 'width:25vw;font-size:1.2rem;background-color: #A0C6F5;color: #F5F9FE;border-radius: 1.625rem 1.625rem 0 0;border: 3px solid #418EEB;border-style: none solid none none;padding:15px 0;'
        }
    }

    // Analysis

    let EOQ = Math.sqrt((2*parseInt(spendingInfo[0].items_sold)*parseInt(spendingInfo[0].total_shipping_expense))/parseInt(spendingInfo[0].number_in_inventory))
    let CCC = (parseInt(spendingInfo[0].number_in_inventory) / parseInt(spendingInfo[0].cogs)) + (parseInt(spendingInfo[0].outstanding_payments_from_customers)/ parseInt(spendingInfo[0].revenue)) - (parseInt(spendingInfo[0].outstanding_payments_to_suppliers) / parseInt(spendingInfo[0].cogs))
    let DSI = parseInt(spendingInfo[0].number_in_inventory) / parseInt(spendingInfo[0].cogs)
    let DPO = parseInt(spendingInfo[0].outstanding_payments_to_suppliers) / parseInt(spendingInfo[0].cogs)
    let DSO = parseInt(spendingInfo[0].outstanding_payments_from_customers)/ parseInt(spendingInfo[0].revenue)
    let ISR = parseInt(spendingInfo[0].number_in_inventory) / parseInt(spendingInfo[0].revenue)
    let ABC = parseInt(spendingInfo[0].items_sold) / parseInt(spendingInfo[0].revenue)
    let ROP = (parseInt(spendingInfo[0].items_sold) * parseInt(spendingInfo[0].average_lead_time_in_days))+ parseInt(spendingInfo[0].safety_stock)
    let FBA = (parseInt(spendingInfo[0].number_of_freight_bills) - parseInt(spendingInfo[0].number_of_error_free_freight_bills)) / parseInt(spendingInfo[0].number_of_freight_bills)

    // Recommendations

    let DSIRec = ''
    if (30 > DSI > 50){
        DSIRec = 'Your Days of Sales Inventory is hitting around average relative to your competitors. To further improve upon this, make sure that your inventory is managed as efficiently as possible.'
    } else if (DSI>70){
        DSIRec = 'Your DSI is way too high compared to your competitors. To reduce this number, isolate the reason why. There could be a few reasons for this. If you are hitting your sales goals, then you are having inventory management issues and vice versa.'
    } else {
        DSIRec = 'Your DSI is way lower compared to your competitors. This is great in many ways, but make sure that you have enough safety stock so that there wont be any stockouts. Furthermore, it is more common for companies with a lower-than-average DSI to make lower-quality products. If that is an issue, definitely invest in improving the quality.'
    }

    let DPORec = ''
    if (20 > DPO > 30){
        DPORec = 'Your Days Payable Outstanding is hitting around average relative to your competitors. Its good to keep a balanced DPO as you want to maintain a good relationship with your partners without losing money in your cash flow.'
    } else if (DPO>30){
        DPORec = 'Your DPO is way too high compared to your competitors. While this is helping you keep money in your cash flow, it can damage supplier relations. If this money is absolutely needed, hold onto it, however, if its due to mismanagement, we recommend paying when expected to maintain supplier relations.'
    } else {
        DPORec = 'Your DPO is way lower compared to your competitors. This is great in many ways as you are forging a strong relationship with your suppliers. Keep it up, however if you need to hold onto the money for very important spending reasons, its okay to not pay it early and prioritize your revenue.'
    }

    let DSORec = ''
    if (30 > DSO > 45){
        DSORec = 'Your Days Sales Outstanding is hitting around average relative to your competitors. Make sure your sales allow you to have strong cashflow without pushing away future customers.'
    } else if (DSO>45){
        DSORec = 'Your Days Sales Outstanding is way too high compared to your competitors. You might consider creating more stringent guidelines for payment.'
    } else {
        DSORec = 'Your DSO is way lower compared to your competitors. This is great as you are increasing your cash flow! Keep going!'
    }

    let FBARec = ''
    if (.80 > FBA > .90){
        FBARec = 'Your Freight Bill Accuracy is okay. You might consider discussing improving this metric with your clients or, if they are unwilling, researching trucking companies to see if there are ones with higher accuracy that are just as cheap.'
    } else if (FBA<.80){
        FBARec = 'Your Freight Bill Accuracy is too low. We would suggest working with another freight company.'
    } else {
        FBARec = 'Your Freight Bill Accuracy is great! Stay with your freight company, they are certainly not losing you money due to errors'
    }

    //Charts

    const [userData, setUserData] = useState({
        labels: ['items sold','cogs','total shipping expense','number in inventory','cost of using inventory','cost of order picking','safety stock','marketing cost','outstanding payments to suppliers','outstanding payments from customers','revenue','average lead time in days','number of freight bills','number of error free freight bills','gross profit from item'],
        datasets: [
            {
                data: [parseFloat(spendingInfo[spendingInfo.length-1].items_sold), parseFloat(spendingInfo[spendingInfo.length-1].cogs), parseFloat(spendingInfo[spendingInfo.length-1].total_shipping_expense), parseFloat(spendingInfo[spendingInfo.length-1].number_in_inventory), parseFloat(spendingInfo[spendingInfo.length-1].cost_of_using_inventory), parseFloat(spendingInfo[spendingInfo.length-1].cost_of_order_picking), parseFloat(spendingInfo[spendingInfo.length-1].safety_stock), parseFloat(spendingInfo[spendingInfo.length-1].marketing_cost), parseFloat(spendingInfo[spendingInfo.length-1].outstanding_payments_to_suppliers), parseFloat(spendingInfo[spendingInfo.length-1].outstanding_payments_from_customers), parseFloat(spendingInfo[spendingInfo.length-1].revenue), parseFloat(spendingInfo[spendingInfo.length-1].average_lead_time_in_days), parseFloat(spendingInfo[spendingInfo.length-1].number_of_freight_bills), parseFloat(spendingInfo[spendingInfo.length-1].number_of_error_free_freight_bills), parseFloat(spendingInfo[spendingInfo.length-1].gross_profit_from_item)],
                backgroundColor: [
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [analysisData, setAnalysisData] = useState({
        labels: ['Economic Order Quantity', 'Cash Conversion Cycle', 'Days Sales of Inventory', 'Days Payable Outstanding', 'Days Sales Outstanding', 'Inventory / Sales Ratio', 'ABC Analysis', 'Reorder Point', 'Freight Bill Accuracy'],
        datasets: [
            {
                data: [EOQ,CCC,DSI,DPO,DSO,ISR,ABC,ROP,FBA],
                backgroundColor: [
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [EOQData, setEOQData] = useState({
        labels: ['Economic Order Quantity', 'Average Economic Order Quantity'],
        datasets: [
            {
                data: [EOQ, 40],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [DSIData, setDSIData] = useState({
        labels: ['Days of Sales Inventory', 'Average Days of Sales Inventory'],
        datasets: [
            {
                data: [DSI, 40],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [DSOData, setDSOData] = useState({
        labels: ['Days Payable Outstanding', 'Average Days Payable Outstanding'],
        datasets: [
            {
                data: [DPO, 25],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [DPOData, setDPOData] = useState({
        labels: ['Days Payable Outstanding', 'Average Days Payable Outstanding'],
        datasets: [
            {
                data: [DPO, 25],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [ISRData, setISRData] = useState({
        labels: ['Income to Sales Ratio', 'Average Income to Sales Ratio'],
        datasets: [
            {
                data: [ISR, 0.21],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    const [FBAData, setFBAData] = useState({
        labels: ['Freight Bill Accuracy', 'Average Freight Bill Accuracy'],
        datasets: [
            {
                data: [FBA, 0.85],
                backgroundColor: [
                    '#A0C6F5',
                    '#418EEB'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })

    const setUpCharts = () => {

        if ((parseInt(spendingInfo.items_sold) / parseInt(spendingInfo.revenue)) > 1){
            setABCRating('C')
        } else if (0< (parseInt(spendingInfo.items_sold) / parseInt(spendingInfo.revenue)) < 1){
            setABCRating('B')
        } else {
            setABCRating('A')
        }      

        setUserData({
            labels: ['items sold','cogs','total shipping expense','number in inventory','cost of using inventory','cost of order picking','safety stock','marketing cost','outstanding payments to suppliers','outstanding payments from customers','revenue','average lead time in days','number of freight bills','number of error free freight bills','gross profit from item'],
            datasets: [
                {
                    data: [parseFloat(spendingInfo[spendingInfo.length-1].items_sold), parseFloat(spendingInfo[spendingInfo.length-1].cogs), parseFloat(spendingInfo[spendingInfo.length-1].total_shipping_expense), parseFloat(spendingInfo[spendingInfo.length-1].number_in_inventory), parseFloat(spendingInfo[spendingInfo.length-1].cost_of_using_inventory), parseFloat(spendingInfo[spendingInfo.length-1].cost_of_order_picking), parseFloat(spendingInfo[spendingInfo.length-1].safety_stock), parseFloat(spendingInfo[spendingInfo.length-1].marketing_cost), parseFloat(spendingInfo[spendingInfo.length-1].outstanding_payments_to_suppliers), parseFloat(spendingInfo[spendingInfo.length-1].outstanding_payments_from_customers), parseFloat(spendingInfo[spendingInfo.length-1].revenue), parseFloat(spendingInfo[spendingInfo.length-1].average_lead_time_in_days), parseFloat(spendingInfo[spendingInfo.length-1].number_of_freight_bills), parseFloat(spendingInfo[spendingInfo.length-1].number_of_error_free_freight_bills), parseFloat(spendingInfo[spendingInfo.length-1].gross_profit_from_item)],
                    backgroundColor: [
                        '#A0C6F5'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setAnalysisData({
            labels: ['Economic Order Quantity', 'Cash Conversion Cycle', 'Days Sales of Inventory', 'Days Payable Outstanding', 'Days Sales Outstanding', 'Inventory / Sales Ratio', 'ABC Analysis', 'Reorder Point', 'Freight Bill Accuracy'],
            datasets: [
                {
                    data: [EOQ,CCC,DSI,DPO,DSO,ISR,ABC,ROP,FBA],
                    backgroundColor: [
                        '#A0C6F5'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setEOQData({
            labels: ['Economic Order Quantity', 'Average Economic Order Quantity'],
            datasets: [
                {
                    data: [EOQ, 40],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setDSIData({
            labels: ['Days of Sales Inventory', 'Average Days of Sales Inventory'],
            datasets: [
                {
                    data: [DSI, 40],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setDSOData({
            labels: ['Days Payable Outstanding', 'Average Days Payable Outstanding'],
            datasets: [
                {
                    data: [DPO, 25],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setDPOData({
            labels: ['Days Payable Outstanding', 'Average Days Payable Outstanding'],
            datasets: [
                {
                    data: [DPO, 25],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setISRData({
            labels: ['Income to Sales Ratio', 'Average Income to Sales Ratio'],
            datasets: [
                {
                    data: [ISR, 0.21],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
        setFBAData({
            labels: ['Freight Bill Accuracy', 'Average Freight Bill Accuracy'],
            datasets: [
                {
                    data: [FBA, 0.85],
                    backgroundColor: [
                        '#A0C6F5',
                        '#418EEB'
                    ],
                    borderColor:'#418EEB',
                    borderWidth: 2
                }
            ]    
        })
    }

    // On Submit

    const handleSubmit = async(e) => {
        e.preventDefault()
        // localStorage.clear()
        // setSpendingInfo({...spendingInfo, business_id:businessInfo.id,
        //     business_name:businessInfo.business_name})
        // localStorage.setItem('spendingInfo', spendingInfo)

        const postSpendingData = async() => {
            try{
                const response = await axios.post(`https://leaf-database-production.up.railway.app/business/${businessInfo.id}/spendingdata/`, formState) 
                setSpendingInfo([...spendingInfo, response.data])
                // setSpendingInfoArray(Object.values(spendingInfo))
                // setNewSpendingInfoArray(spendingInfoArray.splice(3,spendingInfoArray.length-1))
                setFormState(spendingInitialState)
                // newSpendingInfoKeys = Object.keys(spendingInfo)
                // let splicedKeys = newSpendingInfoKeys.splice(-15)
            } catch(e){
            console.log(e.response.data)
            }
        }
        postSpendingData()
        // console.log(spendingInfo)
        // location.reload()
        // newTemporarySpendingInfoKeys = Object.keys(temporarySpendingInfo)
        // let temporarySplicedKeys = newTemporarySpendingInfoKeys.splice(-15)
        // newTemporarySpendingInfoArray = temporarySpendingInfoArray.splice(3,temporarySpendingInfoArray.length-1)

        // console.log(spendingInfoArray)
    }

    return (
        <div className="spending">
            <h1 className="spending-header">A Hub for All of Your Spending Data</h1>
            <div className="tabs">
                <button className="tab-button tab1" onClick={changeInputDisplay}>Data Inputs</button>
                <button className="tab-button tab1" onClick={changeDataDisplay}>Data</button>
                <button className="tab-button tab2" onClick={changeAnalysisDisplay}>Analysis</button>
                <button className="tab-button" onClick={changeRecommendationsDisplay}>Recommendations</button>
            </div>
            <div className="data" 
            style={{display: inputDisplay}}
            >
                <div className="data-inputs">
                    <div className="data-input-column">
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="item" onChange={handleChange} placeholder="Item"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="items_sold" onChange={handleChange} placeholder="Items Sold This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="cogs" onChange={handleChange} placeholder="Cost of Goods Sold"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="total_shipping_expense" onChange={handleChange} placeholder="Total Shipping Expense of These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="number_in_inventory" onChange={handleChange} placeholder="Number of These Items in Inventory This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="cost_of_using_inventory" onChange={handleChange} placeholder="Total Cost of Renting Inventory for These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="cost_of_order_picking" onChange={handleChange} placeholder="Order Picking Cost"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="safety_stock" onChange={handleChange} placeholder="Safety Stock"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="marketing_cost" onChange={handleChange} placeholder="Total Marketing Cost for These Items This Year"/>
                        </div>
                    </div>
                    <div className="data-input-column">
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="outstanding_payments_to_suppliers" onChange={handleChange} placeholder="Total Value of Outstanding Payments to Suppliers for These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="outstanding_payments_from_customers" onChange={handleChange} placeholder="Total Value of Outstanding Customer Payments for These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="revenue" onChange={handleChange} placeholder="Total Revenue of These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="average_lead_time_in_days" onChange={handleChange} placeholder="Average Time a Supplier Takes To Finish an Order for These Items (In Days) This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="number_of_freight_bills" onChange={handleChange} placeholder="Number of Freight Bills for These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="number_of_error_free_freight_bills" onChange={handleChange} placeholder="Number of Freight Bills Without Any Error for These Items This Year"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input' type="text" id="gross_profit_from_item" onChange={handleChange} placeholder="Gross Profit For These Items This Year"/>
                        </div>
                    </div>
                </div>
                <button className='submit-button' onClick={handleSubmit}>Submit</button>
            </div>
            <div className="displayed-data" 
            style={{display: dataDisplay}}
            >
                <div className='displayed-data-container'>
                    <h1 className="tab-header">Item: <span>{spendingInfo?.item}</span></h1>
                    <BarChart chartData={userData} className='bar-chart'/>

                    {/* <div className="displayed-data-left">
                        <h4>Items Sold: {spendingInfo?.items_sold} {spendingInfo?.item}s</h4>
                        <h4>Total Shipping Expense: ${spendingInfo?.total_shipping_expense}</h4>
                        <h4>Number In Inventory: {spendingInfo?.number_in_inventory}</h4>
                        <h4>Cost of Using Inventory: ${spendingInfo?.cost_of_using_inventory}</h4>
                        <h4>Cost of Order Picking: ${spendingInfo?.cost_of_using_inventory}</h4>
                        <h4>Marketing Cost: ${spendingInfo?.marketing_cost}</h4>
                        <h4>Outstanding Payments to Suppliers: ${spendingInfo?.outstanding_payments_to_suppliers}</h4>
                    </div>
                    <div className="displayed-data-right">
                        <h4>Outstanding Payments from Customers: ${spendingInfo?.outstanding_payments_from_customers}</h4>
                        <h4>Revenue: ${spendingInfo?.revenue}</h4>
                        <h4>Average Time a Supplier Takes to Finish an Order for You: {spendingInfo?.average_lead_time_in_days} days</h4>
                        <h4>Number of Freight Bills: {spendingInfo?.number_of_freight_bills}</h4>
                        <h4>Number of Error-Free Freight Bills: {spendingInfo?.number_of_error_free_freight_bills}</h4>
                        <h4>Gross Profit From Item: ${spendingInfo?.gross_profit_from_item}</h4>
                    </div> */}
                </div>
            </div>
            <div className="displayed-analysis" 
            style={{display: analysisDisplay}}
            >
                <h1 className="tab-header">Analysis</h1>
                <div className="bar-chart-grid">
                    <div className='chart'>
                        <PieChart chartData={EOQData} />
                    </div>
                    {/* <div className='chart bar-chart'>
                        <BarChart chartData={CCCData} />
                    </div> */}
                    <div className='chart bar-chart'>
                        <BarChart chartData={DSIData} />
                    </div>
                </div>
                <div className="bar-chart-grid">
                    <div className='chart bar-chart'>
                        <BarChart chartData={DPOData} />
                    </div>
                    <div className='chart'>
                        <PieChart chartData={ISRData} />
                    </div>
                    <div className='chart'>
                        <PieChart chartData={FBAData} />
                    </div>
                </div>
                <BarChart chartData={analysisData} />
            </div>
            <div className="displayed-recommendations" style={{display: recommendationsDisplay}}>
                <h1 className='tab-header'>Recommendations</h1>
                <p className='recommendation'>You should place an order every time you have {ROP} {spendingInfo.item}s left</p>
                <p className='recommendation'>You should order around {EOQ} items every time as that is your Economic Order Quantity</p>
                <p className='recommendation'>You should prioritize the quality of all of your A items</p>
                <p className='recommendation'>{DSIRec}</p>
                <p className='recommendation'>{DPORec}</p>
                <p className='recommendation'>{DSORec}</p>
                <p className='recommendation'>{FBARec}</p>
            </div>
        </div>
    )
}