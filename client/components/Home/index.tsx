import * as React from 'react';

const Home: React.FC = (): React.ReactElement => {
  return (
    <>
      <div>I am home component</div>
      <button onClick={(): void => console.log('Hi')}>Press me</button>
    </>
  );
};

export default Home;
