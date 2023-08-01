export default function SEO(){
    return(
        <div className="social-media">
            <h1 className="social-media-header">A Hub for All of Your Social Media Strategy Information</h1>
            <div className="tabs">
                <button className="tab-button tab1">Data</button>
                <button className="tab-button tab2">Analysis</button>
                <button className="tab-button">Recommendations</button>
            </div>
            <div className="data">
                <div className="data-inputs">
                    <div className="data-input-column">
                        <div className="data-input-container">
                            <input className='data-input social-media-input' type="text" id="items_sold" placeholder="Average consumer age (can base it off of social media follower demographics or choose the audience that you'd like to target)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input social-media-input' type="text" id="total_shipping_expense" placeholder="Gender ratio of consumers (can base it off of social media follower demographics or choose the ratio that you'd like to target)"/>
                        </div>
                        <div className="data-input-container">
                            <input className='data-input social-media-input' type="text" id="number_in_inventory" placeholder="The state your average consumer lives in (can base it off of customer demographics or choose the state that you'd like to target)"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}