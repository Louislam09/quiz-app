import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Home from './components/Home'
import SetupScreen from './components/SetupScreen';
import GameScreen from './components/GameScreen';
import { useContext } from 'react';
import { QuizContext } from './context/QuizProvider';
import { TYPES } from './reducers';
import { getApiUrl } from '../utils/getApiUrl';
export const flows = {
  HOME: 0,
  CHALLENGE: 1,
  GAME: 2
}

function App() {
  const { state, dispatch } = useContext(QuizContext)
  const [flow, setFlow] = useState(0)
  const [config, setConfig] = useState({
    questionNumber: 0,
    difficulty: '',
    type: ''
  })

  const categories = {
    // SPORTS: 21,
    GEO: 22,
    ANIMAL: 27
  }

  useEffect(() => {
    const myCategory = Object.values(categories)
    const ranCategory = myCategory[Math.floor(Math.random() * myCategory.length)]
    const API_URL = getApiUrl({
      amount: config.questionNumber,
      category: ranCategory,
      difficulty: config.difficulty,
      type: config.type
    })

    if (flow === flows.GAME || state.reset) {
      if (state?.questions.length) return
      fetch(API_URL)
        .then(res => {
          if (!res.ok) throw new Error('There was an error')
          return res.json()
        })
        .then(res => {
          dispatch({ type: TYPES.SET_QUESTIONS, payload: res?.results })
        })
        .catch(err => console.log({ err }))
    }
  }, [flow, state.reset])

  return (
    <div className="container-fluid h-100 w-100 bg-dark">
      <div className="row justify-content-center align-items-center">
        <main className="col-6 vh-100 d-flex justify-content-center align-items-center">
          {flows.HOME === flow && <Home setFlow={setFlow} />}
          {flows.CHALLENGE === flow && <SetupScreen setConfig={setConfig} config={config} setFlow={setFlow} />}
          {flows.GAME === flow && <GameScreen setFlow={setFlow} />}
        </main>
      </div>
    </div >
  )
}

export default App
