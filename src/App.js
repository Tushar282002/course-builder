import React from 'react';
import './App.css';
import DndWrapper from './components/DndWrapper';
import CourseBuilder from './components/CourseBuilder';

function App() {
  return (
    <div className="App">
      <DndWrapper>
        <CourseBuilder />
      </DndWrapper>
    </div>
  );
}

export default App;
