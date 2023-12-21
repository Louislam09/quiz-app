import React from 'react'
import { flows } from '../App'

function SetupScreen({ config, setFlow, setConfig }) {
    const difficulty = ['easy', 'medium', 'hard'];
    const questionNumbers = [5, 10, 15, 20];
    const types = ['boolean', 'multiple'];

    const onDifficulty = (value) => {
        setConfig(prev => ({
            ...prev,
            difficulty: value
        }))
    }
    const onType = (value) => {
        console.log(config)
        setConfig(prev => ({
            ...prev,
            type: value
        }))
    }
    const onQuestionNumber = (value) => {
        setConfig(prev => ({
            ...prev,
            questionNumber: value
        }))
    }

    const sections = [
        {
            id: 'questionNumber',
            title: 'Select Number of Questions',
            options: questionNumbers,
            handler: onQuestionNumber
        },
        {
            id: 'difficulty',
            title: 'Select Difficulty',
            options: difficulty,
            handler: onDifficulty
        },
        {
            id: 'type',
            title: 'Select Type',
            options: types,
            handler: onType
        },
    ]

    return (
        <section className="my_bg border d-flex flex-column rounded w-100 h-100">
            <h1 className='text-center pt-5 text-decoration-underline w-100 mb-5'>CONFIGURATION</h1>
            <section className='w-100 h-100 d-flex flex-column align-items-center justify-content-start'>
                {sections.map(({ id, title, options, handler }) => (
                    <section
                        key={id}
                        className="text-bg-dark mb-5 w-50 h-25 d-flex flex-column align-items-center"
                    >
                        <div className="px-4 text-center pt-3 w-100 fw-bold">
                            {title}
                            <hr />
                        </div>
                        <div className="row gap-2 px-5 w-100 h-100 d-flex align-items-center justify-content-center">
                            {options.map(option => (
                                <p
                                    className={`col text-capitalize py-2 px-3 text-center border ${config[id] === option && 'border-2 border-success'}`}
                                    role='button'
                                    key={option}
                                    onClick={() => handler(option)}
                                >{option}</p>
                            ))}
                        </div>
                    </section>
                ))}
                <section className='px-4 w-100 text-end p-3'>
                    <button
                        className="btn btn-lg btn-dark border-dark px-5 py-2"
                        onClick={() => setFlow(flows.GAME)}
                    >
                        NEXT
                    </button>
                </section>
            </section>
        </section>
    )
}

export default SetupScreen