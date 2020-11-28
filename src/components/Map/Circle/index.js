import React from 'react';
import { useSpring, animated } from 'react-spring';

const Circle = (props) => {
  const style = useSpring({
    config: {
      duration: 500
    },
    opacity: props.isShowing ? 1 : 0
  });

  return (
    <animated.circle
      {...style}
      r={4}
      transform={`translate(${props.proj})`}
      fill={props.color}
      code={props.code}
    />
  );
};

export default Circle;
