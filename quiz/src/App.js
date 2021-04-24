import React, { useState, useEffect } from "react";
import './App.css'
import {decode} from 'html-entities';
import { Button } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
export default function App() {
  const [questions, setQuestions] = useState([]);
  //const [firstRun, setFirstRun] = useState(true);
  const [qNum, setQNum] = useState(10);

    useEffect(() => {
      fetch('https://opentdb.com/api.php?amount='+qNum)
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setQuestions(res.results);
        });
    }, []);

  function Question(props){
    const[answerList,setAnswerList]=useState([]);
    const[qColor, setQColor]=useState({color:'black'});
    const[firstRun,setFirstRun]=useState(true);
    const[btnStatus,setBtnStatus]=useState(false);

      if(firstRun===true){
        answerList.push(props.question.correct_answer);
        let x = 0;
        for(x=0;x<props.question.incorrect_answers.length;x++)
        answerList.push(props.question.incorrect_answers[x]);
        let currentIndex = answerList.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
          temporaryValue = answerList[currentIndex];
          answerList[currentIndex] = answerList[randomIndex];
          answerList[randomIndex] = temporaryValue;
          setFirstRun(false);
        }
      }

    return(
      <div>
        <p style={qColor}>{decode(props.question.question)}</p>
        {answerList.map(answers => (<Button style={{margin:7}} variant="contained" color="primary"
        disabled={btnStatus} 
        onClick={()=>
        {if(answers===props.question.correct_answer){
            console.log("Correct Answer Chosen");
           setQColor({color:'green'});
           setBtnStatus(true);
        }
          else{
            console.log("Incorrect Answer Chosen");
           setQColor({color:'red'});
           setBtnStatus(true);
          }
        }}>{decode(answers)}</Button>))}
      </div>

    );

  };

  /*
  if(firstRun===true){
    return(
      <div class="centered">
        <h1>👾 Quiz Time! 🤖</h1>
        <form>
        <label>
          No. of Questions:
          <input type="number" onChange={evt=>setQNum(evt.target.value)}/>
        </label>
        <button onClick={()=>{
          setFirstRun(false);
        }}>Start</button>
        </form>
      </div>
    )
  }
  else{
    */
    return (
      <div class="centered">
        <h1>👾 Quiz Time! 🤖</h1>
        {questions.map((question) => (
          <Question question={question}/>
        ))}
      </div>
    );
  };
