import React, { useState, useEffect } from 'react';
import classes from './typingAnimation.module.css'

function TypingAnimation(props) {
  const [text, setText] = useState('');
  const [textIndex, setTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextText = props.text.slice(0, textIndex + 1);
      setText(nextText);
      if (nextText === props.text) {
        clearInterval(intervalId);
      } else {
        setTextIndex(textIndex + 1);
      }
    }, props.interval);
    return () => clearInterval(intervalId);
  }, [textIndex, props]);

  return <p className={classes.h1}>{text}</p>;
}

export default TypingAnimation;