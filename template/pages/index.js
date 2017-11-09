import React from 'react';
import Hello from '../components/Hello';

const Index = () => (
  <div>
    <Hello name="your new project" />
    <style jsx global>{`
      * {
        margin: 0;
        box-sizing: border-box;
      }
    `}</style>
  </div>
);

export default Index;
