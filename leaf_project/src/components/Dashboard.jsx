

export default function Dashboard(){
    return(
        <main className="dashboard">
            <h1 className='dashboard-header'>Welcome to your Dashboard!</h1>
            <div className="dashboard-items">
                <div className="dashboard-item">
                    <h1 className="dashboard-item-header">Digital Marketing</h1>
                    <div className="dashboard-item-section-container">
                        <div className="dashboard-item-section">
                            <h3>Search Engine Optimization</h3>
                        </div>
                        <div className="dashboard-item-section">
                            <h3>Social Media</h3>
                        </div>
                    </div>
                </div>
                <div className="dashboard-item">
                    <h1 className="dashboard-item-header">Spending</h1>
                    <div className="dashboard-item-section-container">
                        <div className="dashboard-item-section">
                            <h3>Supply Chain</h3>
                        </div>
                        <div className="dashboard-item-section">
                            <h3>Profit Usage</h3>
                        </div>
                    </div>
                </div>
                <div className="dashboard-item">
                    <h1 className="dashboard-item-header">Web Design</h1>
                    <div className="dashboard-item-section-container">
                        <div className="dashboard-item-section">
                            <h3>Style</h3>
                        </div>
                        <div className="dashboard-item-section">
                            <h3>Alignment</h3>
                        </div>
                    </div>
                </div>
                <div className="dashboard-item">
                    <h1 className="dashboard-item-header">ESG Metrics</h1>
                    <div className="dashboard-item-section-container">
                        <div className="dashboard-item-section esg-item-section">
                            <h3>Worker Pay</h3>
                        </div>
                        <div className="dashboard-item-section esg-item-section">
                            <h3>Materials</h3>
                        </div>
                        <div className="dashboard-item-section esg-item-section">
                            <h3>Energy</h3>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}