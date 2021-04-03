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
  return (
    <div>
      <h1>Hey, Launch! 👋</h1>
      {questions.map((question) => (
        <p>{question.question}</p>
      ))}
    </div>
  );
}