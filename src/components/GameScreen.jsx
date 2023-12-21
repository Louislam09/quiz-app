import React, { useContext, useEffect, useMemo, useState } from 'react'
import { QuizContext } from '../context/QuizProvider'
import { TYPES } from '../reducers'
import { flows } from '../App'
import CircularProgress from './CircularProgress'
import QuizResult from './Result'

const Spinner = () => (
    <div className="spinner-border text-warning" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
)

function GameScreen({ setFlow }) {
    const [selectedIndex, setSelectedIndex] = useState(null)
    const [mainProgress] = useState({
        size: 80,
        strokeWidth: 80 / 10,
        color: '#fec825'
    })
    const { state, dispatch } = useContext(QuizContext)
    const currentQuestion = state?.questions?.[state.currentQuestion] ?? {}
    const answers = useMemo(() => {
        return [...(currentQuestion?.incorrect_answers || []), currentQuestion?.correct_answer].sort(() => Math.random() - 0.5) ?? []
    }, [state.currentQuestion, state.questions])

    const percent = state.currentQuestion / state.questions.length * 100

    const correctAnswers = Object.keys(state?.answers).reduce((count, key) => {
        return state?.answers?.[key] === state?.questions[key].correct_answer ? count + 1 : count
    }, 0)

    const onAnswer = (answer, index) => {
        dispatch({ type: TYPES.ANSWER_QUESTION, payload: answer })
        setSelectedIndex(index)
    }

    const onNextQuestion = () => {
        dispatch({ type: TYPES.NEXT_QUESTION })
        setSelectedIndex(null)
    }



    return (
        <section
            className={`w-100 h-100 my_bg border rounded d-flex flex-column 
            justify-content-${(state?.questions.length === 0 || state?.currentQuestion === state?.questions.length) ? 'center' : 'start'} align-items-center pt-5`}
        >
            {state?.questions.length === 0 ? (
                <Spinner />
            ) : state?.currentQuestion === state?.questions.length ? (
                <QuizResult setFlow={setFlow} />
            ) : (
                <>
                    <div className='text-center mt-5 p-1'>
                        <CircularProgress
                            size={mainProgress.size}
                            strokeWidth={mainProgress.strokeWidth}
                            percent={Math.floor(percent)}
                            color={mainProgress.color}
                        />
                    </div>

                    <div className='mt-4 text-center' style={{ color: '#ddd' }}>
                        <h5>{currentQuestion?.category ?? ''}</h5>
                    </div>

                    <div className='mt-2 text-center text-wrap px-2 mb-4'>
                        <h3>{currentQuestion?.question.replace(/&#039;/g, "'") ?? ''}</h3>
                    </div>

                    <div className='d-flex flex-column w-75 align-items-center h-50'>
                        {answers.map((answer, index) => (
                            <button
                                key={index}
                                className={`btn btn-lg btn-outline-light border border-2    w-100 rounded-pill my-3 ${index === selectedIndex ? 'border-warning' : 'border-white'}`}
                                onClick={() => onAnswer(answer, index)}
                            >{answer}</button>
                        ))}
                    </div>

                    {selectedIndex !== null && (
                        <div className='w-100 h-100 text-end' style={{ position: 'relative' }}>
                            <button
                                style={{ position: 'absolute', right: 20, bottom: 30 }}
                                className="btn btn-lg btn-outline-light border-warning px-5 py-2"
                                onClick={onNextQuestion}
                            >
                                NEXT
                            </button>
                        </div>)}
                </>
            )}

        </section>
    )
}

export default GameScreen