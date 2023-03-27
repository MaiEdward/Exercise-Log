import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddExercisePage from './pages/AddExercisePage';
import EditExercisePage from './pages/EditExercisePage';
import {useState} from 'react';

export const URL = process.env.REACT_APP_SERVER_URL

function App() {
  const[exerciseToEdit, setExerciseToEdit] = useState([])

  return (
    <div className="App">
      <header>
        <h1>Lifting Diary</h1>
        <p>Keep track of your exercises!</p>
      </header>
      <Router>
        <div className="App-header">
          <Routes>
            <Route path='/' element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
            <Route path='/add-exercise' element = {<AddExercisePage/>}/>
            <Route path ='edit-exercise' element = {<EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
          </Routes>
        </div>
      </Router>
      <footer> © 2023 Edward Mai</footer>
    </div>
  );
}


export default App;