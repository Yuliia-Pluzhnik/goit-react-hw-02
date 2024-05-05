import './App.module.css'

import { useState, useEffect } from 'react';
import Description from '../Description/Description.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Options from '../Options/Options.jsx';
import Notification from '../Notification/Notification.jsx';

function App() {
  const initialFeedback = JSON.parse(localStorage.getItem('feedback')) || {
    good: 0,
    neutral: 0,
    bad: 0
  };

  const [feedback, setFeedback] = useState(initialFeedback);

  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;
  const positiveFeedback = totalFeedback === 0 ? 0 : Math.round((feedback.good / totalFeedback) * 100);

  const updateFeedback = feedbackType => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1
    }));
  };

  const handleReset = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0
    });
  };

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <>
      <Description />
      <Options updateFeedback={updateFeedback} totalFeedback={totalFeedback} handleReset={handleReset} />
      {totalFeedback > 0 ? (
        <>
          <Feedback feedback={feedback} totalFeedback={totalFeedback} positiveFeedback={positiveFeedback} />
      
        </>
      ) : (
        <Notification message="No feedback yet." />
      )}
    </>
  );
}

export default App;
