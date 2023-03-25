import React, { useState, useEffect } from 'react';

function CountdownTimer(props:{ setEndtime: any }) {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCountdown(0);
      props.setEndtime(true)
    }
  }, [countdown]);

  return (
    <div>
      <h1>{countdown}</h1>
    </div>
  );
}

export default CountdownTimer;