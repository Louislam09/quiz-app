import React, { useContext, useState } from 'react'
import { QuizContext } from '../context/QuizProvider'
import CircularProgress from './CircularProgress'
import { TYPES } from '../reducers'
import { flows } from '../App'

function QuizResult({ setFlow }) {
    const [resultProgress] = useState({
        size: 160,
        strokeWidth: 160 / 10,
        color: '#fec825'
    })
    const { state, dispatch } = useContext(QuizContext)
    const correctAnswers = Object.keys(state?.answers).reduce((count, key) => {
        return state?.answers?.[key] === state?.questions[key].correct_answer ? count + 1 : count
    }, 0)

    const goHome = () => {
        setFlow(flows.HOME)
        dispatch({ type: TYPES.RESET_QUIZ, payload: false })
    }
    return (
        <div className='d-flex flex-column align-items-center justify-content-center w-100 h-100'>
            <h1 className='my-5'>Your result is </h1>
            <div>
                <CircularProgress
                    size={resultProgress.size}
                    strokeWidth={resultProgress.strokeWidth}
                    percent={correctAnswers / state?.questions.length * 100}
                    color={resultProgress.color}
                    textSize={1}
                />
            </div>

            <div className='d-flex align-items-center justify-content-around w-100 w-100 text-center mt-5 pt-5'>
                <button
                    className="btn btn-lg border-3 border border-warning btn-outline-warning px-5 py-2"
                    onClick={() => dispatch({ type: TYPES.RESET_QUIZ, payload: true })}
                >
                    RESET
                </button>
                <button
                    className="btn btn-lg border-3 border btn-outline-light px-5 py-2"
                    onClick={goHome}
                >
                    HOME
                </button>
            </div>
        </div>
    )
}

export default QuizResult