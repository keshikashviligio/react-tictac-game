import React from 'react';
import './App.css';
import Grid from "./components/Grid/Grid";
import GridHeader from "./components/GridHeader/GridHeader";

function App() {
  return (
    <div className="App">
      <GridHeader/>
      <Grid/>
    </div>
  );
}

export default App;
