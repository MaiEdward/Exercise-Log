import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {URL} from "../App.js";


export const AddExercisePage = () => {
    const [name, setName] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const cancel = async () => {
        navigate('/')
    }

    const addExercise = async () => {
        const newExercise = {name, sets, reps, weight, unit, date}
        const response = await fetch(`${URL}/exercises`, {
            method: 'POST',
            body: JSON.stringify(newExercise),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (response.status === 201) {
            alert('Successfully added the exercise');
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
        navigate('/');
    };

    return (
        <div>
            <h2> Add Exercise </h2>
            <input
                type='text'
                placeholder='Enter name of exercise here'
                value= {name}
                onChange={e => setName(e.target.value)}/>
            <input
                type='number'
                placeholder='Enter sets completed here'
                value={sets}
                onChange={e => setSets(e.target.value)}/>
            <input
                type='number'
                placeholder='Enter reps completed here'
                value={reps}
                onChange={e => setReps(e.target.value)}/>
            <input
                type='number'
                placeholder='Enter weight completed here'
                value={weight}
                onChange={e => setWeight(e.target.value)}/>
            <select name='units' value={unit} onChange={e => setUnit(e.target.value)}>
                <option value='' selected disabled hidden> Select a Unit </option>
                <option value='kgs'>kgs</option>
                <option value ='lbs'>lbs</option>
            </select>
            <input
                type='text'
                placeholder='Date completed: mm-dd-yy'
                value={date}
                onChange={e =>setDate(e.target.value)}/>
            <div></div>
            <button onClick={addExercise}>Add</button>
            <button onClick={cancel}>Cancel</button>
        </div>
    )

};

export default AddExercisePage;

