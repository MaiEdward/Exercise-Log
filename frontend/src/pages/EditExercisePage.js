import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import {URL} from "../App.js";


export const EditExercisePage = ({exerciseToEdit}) => {
    const [name, setName] = useState(exerciseToEdit.name);
    const [sets, setSets] = useState(exerciseToEdit.sets);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const cancel = async () => {
        navigate('/')
    }
    
    const editExercise = async () => {
        const editedExercise = {name, sets, reps, weight, unit, date}
        const response = await fetch(`${URL}/exercises/${exerciseToEdit._id}`, {
            method: 'PUT',
            body: JSON.stringify(editedExercise),
            headers: {
                'Content-type': 'application/json',
            },
        });
        if (response.status === 200) {
            alert('Successfully edited the exercise');
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
        navigate('/');
    };

    return (
        <div>
            <h1> Edit Exercise </h1>
            <input
                type='text'
                value= {name}
                onChange={e => setName(e.target.value)}/>
             <input
                type='number'
                value={sets}
                onChange={e => setSets(e.target.value)}/>
            <input
                type='number'
                value={reps}
                onChange={e => setReps(e.target.value)}/>
            <input
                type='number'
                value={weight}
                onChange={e => setWeight(e.target.value)}/>
            <select name='units' value={unit} onChange={e => setUnit(e.target.value)}>
                <option value='' selected disabled hidden> Select a Unit </option>
                <option value='kgs'>kgs</option>
                <option value ='lbs'>lbs</option>
            </select>
            <input
                type='text'
                value={date}
                onChange={e =>setDate(e.target.value)}/>
            <div></div>
            <button onClick={editExercise}>Save</button>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default EditExercisePage;