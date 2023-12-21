import React from 'react'
// @ts-ignore
import logoImage from '../assets/logo.png'
import { flows } from '../App'

function Home({ setFlow }) {

    const onStart = () => {
        setFlow(flows.CHALLENGE)
    }

    return (
        <section className='p-1  my_bg border rounded h-100 w-100 d-flex flex-column align-items-center justify-content-around h-100'>
            <div className='d-flex flex-column align-items-center justify-content-center w-100 h-100'>
                <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center'>
                    <img className="home_logo" src={logoImage} />
                    <h1 className='text-center text-light'>Trivia App</h1>
                </div>
                <div className='text-center p-5 w-100 h-100 '>
                    <button className="btn btn-lg px-5 btn-outline-light border-white" onClick={onStart}>
                        START
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Home