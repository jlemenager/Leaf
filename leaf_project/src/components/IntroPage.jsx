import { useState } from 'react'
import IntroNav from './IntroNav'
import Footer from './IntroFooter'

export default function IntroPage(){

    const [user, setUser] = useState('')
    
    return(
        <div className='intro-page'>
            <IntroNav />
            <main>
                <div className='hero'>
                    <div className='hero-text'>
                        <h1 className='hero-text-header'>Want to turn a new leaf?</h1>
                        <h2 className='hero-text-subheader'>Grow your business with our automated consulting software.</h2>
                    </div>
                </div> 
            </main>
            <Footer />
        </div>
    )
}