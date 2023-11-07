import React, { useState, useCallback } from 'react';

const SomeComponent = React.memo(({ onClick }) => {
  console.log('SomeComponent rendered!');
  return <button onClick={onClick}>Click me</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  
  // The useCallback hook will return a memoized version of the callback
  // that only changes if one of the dependencies has changed. In this case, []
  // means it never changes, so the same function is reused on each render.
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  // If there were dependencies, for example, [count], then the callback
  // would be recreated whenever the count changes.
  
  return (
    <div>
      <SomeComponent onClick={increment} />
      <div>Count: {count}</div>
    </div>
  );
};

export default ParentComponent;
