import React, { useState, useEffect } from "react";
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

  //Fisher-Yates Shuffle
  const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  const randomizeAnswers = (a) =>{
      let answerList = [];
      answerList.push(a.correct_answer);
      let x = 0;
      for(x=0;x<a.incorrect_answers.length;x++)
        answerList.push(a.incorrect_answers[x]);
      answerList=shuffle(answerList);
      if(answerList.length==2)
        return (<div>
            <button>{answerList[0]}</button>
            <button>{answerList[1]}</button>
        </div>);
      if(answerList.length===3)
        return (<div>
          <button>{answerList[0]}</button>
          <button>{answerList[1]}</button>
          <button>{answerList[2]}</button>
      </div>);
      if(answerList.length===4)
        return (<div>
          <button>{answerList[0]}</button>
          <button>{answerList[1]}</button>
          <button>{answerList[2]}</button>
          <button>{answerList[3]}</button>
      </div>);
    };


    return (
      <div>
        <h1>Quiz Time! 👋</h1>
        {questions.map((question) => (
          <div class="qAndA">
          <p>{question.question}</p>
          {randomizeAnswers(question)}
          </div>
        ))}
      </div>
    );

  };

