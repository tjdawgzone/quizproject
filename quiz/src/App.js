import React, { useState, useEffect } from "react";
import './App.css'
export default function App() {
  const [questions, setQuestions] = useState([]);
  const numOfQs = 10;
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount='+numOfQs)
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
        <p style={qColor}>{props.question.question}</p>
        {answerList.map(answers => (<button onClick={()=>
        {if(answers===props.question.correct_answer){
            console.log("Correct Answer Chosen");
           setQColor({color:'green'});
        }
          else{
            console.log("Incorrect Answer Chosen");
           setQColor({color:'red'});
          }
        }}>{answers}</button>))}
      </div>

    );

  };

  return (
    <div class="centered">
      <h1>👾 Quiz Time! 🤖</h1>
      {questions.map((question) => (
        <Question question={question}/>
      ))}
    </div>
  );

};
