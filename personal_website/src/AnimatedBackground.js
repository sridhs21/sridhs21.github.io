import React, { useState, useEffect, useCallback } from 'react';

const AnimatedBackground = () => {
  const [balls, setBalls] = useState([]);
  const maxBalls = 100;
  const backgroundColor = '#0B132B';  //dark, but not black
  const ballColor = '#5BC0BE';  //color of circles

  const createBall = useCallback(() => {
    const size = Math.random() * 30 + 5; //5-35px
    const startPosition = Math.random() * 100;
    const duration = Math.random() * 20 + 10; //10-30 secs
    const delay = Math.random() * 5;

    return {
      id: Date.now() + Math.random(),
      size,
      startPosition,
      duration,
      delay,
      top: Math.random() * 100, //random vertical position
    };
  }, []);

  const checkCollision = useCallback((newBall, existingBalls) => {
    return existingBalls.some(ball => {
      const dx = (newBall.startPosition - ball.startPosition) * window.innerWidth / 100;
      const dy = (newBall.top - ball.top) * window.innerHeight / 100;
      const distance = Math.sqrt(dx * dx + dy * dy);
      return distance < (newBall.size + ball.size) / 2;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBalls(prevBalls => {
        if (prevBalls.length >= maxBalls) return prevBalls;

        const newBall = createBall();
        if (checkCollision(newBall, prevBalls)) {
          return prevBalls; //don't add ball if collide
        }
        return [...prevBalls, newBall];
      });
    }, 100); //try add ball every # millisecs

    return () => clearInterval(interval);
  }, [createBall, checkCollision]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setBalls(prevBalls => prevBalls.filter(ball => {
        const element = document.getElementById(`ball-${ball.id}`);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.left < window.innerWidth;
      }));
    }, 1000);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: 'hidden',
      zIndex: -1,
      backgroundColor: backgroundColor,
    }}>
      <style>
        {`
          @keyframes moveDiagonally {
            0% {
              transform: translate(-100px, 0);
              opacity: 0;
            }
            10% {
              opacity: 0.7;
            }
            90% {
              opacity: 0.7;
            }
            100% {
              transform: translate(calc(100vw + 100px), 0);
              opacity: 0;
            }
          }
        `}
      </style>
      {balls.map(ball => (
        <div
          key={ball.id}
          id={`ball-${ball.id}`}
          style={{
            position: 'absolute',
            width: ball.size,
            height: ball.size,
            borderRadius: '50%',
            backgroundColor: ballColor,
            left: `${ball.startPosition}vw`,
            top: `${ball.top}%`,
            animation: `moveDiagonally ${ball.duration}s linear ${ball.delay}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;