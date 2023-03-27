import React from 'react';
import ExerciseList from '../components/ExerciseList';
import {useState, useEffect} from 'react';
import { useNavigate, Link} from 'react-router-dom';
import {URL} from "../App.js"

function HomePage({setExerciseToEdit}) {

    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async() => {
        const response = await fetch(`${URL}/exercises`);
        const exercises = await response.json();
        setExercises(exercises);
    };

    const onDelete = async _id => {
        const response = await fetch(`${URL}/exercises/${_id}`, {method: 'DELETE'});
        if(response.status === 204) {
            const newExercises = exercises.filter(e => e._id !== _id);
            setExercises(newExercises);
        } else {
            console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`);
        }
    };

    const onEdit = exercise => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    }

    useEffect(() => {
        loadExercises();
    }, []);

    return (
        <>
            <h2> Exercises Completed </h2>
            <ExerciseList exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseList>
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
}

export default HomePage;