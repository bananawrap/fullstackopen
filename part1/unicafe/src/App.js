import { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
)

const StatisticLine = (props) => {
  return (
  <tr>
    <td>{props.text}</td> 
    <td>{props.value}</td>
  </tr>
  )

}

const Statistics = (props) => {

  
  if (props.total) {
    return (
    <div>
      <Header text="statistics"/>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good}/>
          <StatisticLine text="neutral" value={props.neutral}/>
          <StatisticLine text="bad" value={props.bad}/>
          <StatisticLine text="all" value={props.total}/>
          <StatisticLine text="average" value={props.avg}/>
          <StatisticLine text="positive" value={`${props.goodratio} %`}/>
        </tbody>
      </table>
    </div>
  )
}else {
  return (
    <div>
      <Header text="statistics"/>
      <p>No feedback given</p>
    </div>
  )
}
} 

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good + 1)
  const incrementNeutral = () => setNeutral(neutral + 1)
  const incrementBad = () => setBad(bad + 1)

  const calcTotal = () => good + neutral + bad

  const calcAvg = () => {
    const score = good - bad
    return (score / calcTotal())
  }

  const calcGoodRatio = () => ((good / calcTotal()) * 100)


  return (
    <div>
      <Header text="give feedback"/>
      <Button handleClick={incrementGood} text="good"></Button>
      <Button handleClick={incrementNeutral} text="neutral"></Button>
      <Button handleClick={incrementBad} text="bad"></Button>

      <Statistics good={good} neutral={neutral} bad={bad} total={calcTotal()} avg={calcAvg()} goodratio={calcGoodRatio()} />
    </div>
  )
}

export default App