import { useState, useContext, useEffect } from "react"
import UserContext from "../UserContext"
import axios from 'axios'
import BarChart from "./BarChart"
import LineChart from "./LineChart"
import PieChart from "./PieChart"

export default function Spending(){

    // Variables

    const { businessInfo, setBusinessInfo } = useContext(UserContext)
    const [Response, setResponse] = useState(null)
    const [ABCRating, setABCRating] = useState(null)
    const [display, setDisplay] = useState('none')
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
    const [spendingInfo, setSpendingInfo] = useState(spendingInitialState)
    let newSpendingInfoArray = []
    let newSpendingInfoKeys = []

    // Chart Data
    const [spendingInfoArray, setSpendingInfoArray] = useState(Object.values(spendingInfo))
    const [userData, setUserData] = useState({
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
        datasets: [
            {
                data: spendingInfoArray.map(data=>parseFloat(data)),
                backgroundColor: [
                    '#A0C6F5'
                ],
                borderColor:'#418EEB',
                borderWidth: 2
            }
        ]    
    })
    
    const handleChange = (event) => {
        // console.log(businessInfo)
        setSpendingInfo({...spendingInfo, [event.target.id]: event.target.value})
        // console.log(Object.values(spendingInfo))
        setSpendingInfoArray(Object.values(spendingInfo))
        
        // for (let i = 0; i < spendingInfoArray.length; i++){
        //     newSpendingInfoArray.push(parseFloat(spendingInfoArray[i]))
        // }
    }

    // useEffect(()=> {
    //     if (userData !== {
    //         labels: splicedKeys,
    //         datasets: [
    //             {
    //                 data: newSpendingInfoArray.map(data=>parseFloat(data)),
    //                 backgroundColor: [
    //                     '#A0C6F5'
    //                 ],
    //                 borderColor:'#418EEB',
    //                 borderWidth: 2
    //             }
    //         ]    
    //     }){
    //         const getResponseAPI = async() => {
    //             console.log(businessInfo)
    //             console.log(spendingInfo)
    //             const response = await axios.get(`http://localhost:8000/business/${businessInfo.id}/spendingdata/`)
    //             setSpendingInfo(response.data[0])
                
    //         }
    //         getResponseAPI()
    //         handleSubmit()
    //     }
    // }, [])

    // On Submit

    const handleSubmit = async(e) => {
        e.preventDefault()
        newSpendingInfoKeys = Object.keys(spendingInfo)
        let splicedKeys = newSpendingInfoKeys.splice(-15)
        newSpendingInfoArray = spendingInfoArray.splice(3,spendingInfoArray.length-1)
        if ((parseInt(spendingInfo.items_sold) / parseInt(spendingInfo.revenue)) > 1){
            setABCRating('C')
        } else if (0< (parseInt(spendingInfo.items_sold) / parseInt(spendingInfo.revenue)) < 1){
            setABCRating('B')
        } else {
            setABCRating('A')
        }
        const postSpendingData = async() => {
            try{
                const response2 = await axios.post(`http://localhost:8000/business/${businessInfo.id}/spendingdata/`, spendingInfo)  
            } catch(e){
                console.log(e.response.data)
            }
        }
        setTimeout(postSpendingData, 500)
        setUserData({
            labels: splicedKeys,
            datasets: [
                {
                    data: newSpendingInfoArray.map(data=>parseFloat(data)),
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
        // console.log(spendingInfoArray)
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
    let EOQ = Math.sqrt((2*parseInt(spendingInfo.items_sold)*parseInt(spendingInfo.total_shipping_expense))/parseInt(spendingInfo.number_in_inventory))
    let CCC = (parseInt(spendingInfo.number_in_inventory) / parseInt(spendingInfo.cogs)) + (parseInt(spendingInfo.outstanding_payments_from_customers)/ parseInt(spendingInfo.revenue)) - (parseInt(spendingInfo.outstanding_payments_to_suppliers) / parseInt(spendingInfo.cogs))
    let DSI = parseInt(spendingInfo.number_in_inventory) / parseInt(spendingInfo.cogs)
    // console.log(inputDisplay)
    let DPO = parseInt(spendingInfo.outstanding_payments_to_suppliers) / parseInt(spendingInfo.cogs)
    let DSO = parseInt(spendingInfo.outstanding_payments_from_customers)/ parseInt(spendingInfo.revenue)
    let ISR = parseInt(spendingInfo.number_in_inventory) / parseInt(spendingInfo.revenue)
    let ABC = parseInt(spendingInfo.items_sold) / parseInt(spendingInfo.revenue)
    let ROP = (parseInt(spendingInfo.items_sold) * parseInt(spendingInfo.average_lead_time_in_days))+ parseInt(spendingInfo.safety_stock)
    let FBA = (parseInt(spendingInfo.number_of_freight_bills) - parseInt(spendingInfo.number_of_error_free_freight_bills)) / parseInt(spendingInfo.number_of_freight_bills)

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

    const [analysisData, setAnalysisData] = useState({
        labels: ['Economic Order Quantity', 'Cash Conversion Cycle', 'Days Sales of Inventory', 'Days Payable Outstanding', 'Days Sales Outstanding', 'Inventory / Sales Ratio', 'ABC Analysis', 'Reorder Point', 'Freight Bill Accuracy'],
        datasets: [
            {
                data: [EOQ, DSI, DSO, DPO, ISR, ABC, ROP, FBA],
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

    const [DSOData, setDSOData] = useState({
        labels: ['Days Sales Outstanding', "Average Days Sales Outstanding"],
        datasets: [
            {
                data: [DSO, 37.5],
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
                {/* <button>Total Items</button>
                <button>Add Items</button> */}
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
                            {/* <span>OR</span>
                            <input className='data-input' type="text" id="cost_of_using_inventory" onChange={handleChange} placeholder="Total Cost of Maintaining Inventory for These Items This Year"/> */}
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
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="displayed-data" 
            style={{display: dataDisplay}}
            >
                <div className='displayed-data-container'>
                    <h1>Item: {spendingInfo?.item}</h1>
                    <p>{spendingInfo.items_sold}</p>
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
                <div className="bar-chart-grid">
                    <div className='pie-chart'>
                        <PieChart chartData={EOQData} />
                    </div>
                    <div className='pie-chart'>
                        <PieChart chartData={DSIData} />
                    </div>
                    <div className='pie-chart'>
                        <PieChart chartData={DSOData} />
                    </div>
                    <div className='pie-chart'>
                        <PieChart chartData={DPOData} />
                    </div>
                    <BarChart chartData={FBAData} />
                </div>
                <BarChart chartData={analysisData} />
                {/* <h4>Economic Order Quantity: {EOQ}</h4>
                <h4>Cash Conversion Cycle: {CCC}</h4>
                <h4>Days Sales of Inventory: {DSI}</h4>
                <h4>Days Payable Outstanding: {DPO}</h4>
                <h4>Days Sales Outstanding: {DSO}</h4>
                <h4>Inventory / Sales Ratio: {ISR}</h4>
                <h4>ABC Analysis: {ABC} and is therefore a/an {ABCRating} item</h4>
                <h4>Reorder Point: {ROP}</h4>
                <h4>Freight Bill Accuracy: {FBA}</h4>  */}
            </div>
            <div className="displayed-recommendations" style={{display: recommendationsDisplay}}>
                <h1>Recommendations</h1>
                <p>You should place an order every time you have {ROP} {spendingInfo.item}s left</p>
                <p>You should order around {EOQ} items every time as that is your Economic Order Quantity</p>
                <p>You should prioritize the quality of all of your A items</p>
                <p>{DSIRec}</p>
                <p>{DPORec}</p>
                <p>{DSORec}</p>
                <p>{FBARec}</p>
            </div>
        </div>
    )
}