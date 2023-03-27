import mongoose from "mongoose";
import "dotenv/config";

// Define Schema
const exerciseSchema = mongoose.Schema({
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

// Create exercise
const createExercise = async (name, sets, reps, weight, unit, date) => {
    const exercise = new Exercise({name: name, sets: sets, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save();
}

//Find exercise
const findExercise = async (filter, projection, limit) => {
    const query = Exercise.find(filter)
        .select(projection)
        .limit(limit)
    return query.exec();
}

//Find exercise by ID
const findExerciseById = async (_id) => {
    const query = Exercise.findById(_id);
    return query.exec();
}

// Update an exercise with new data
const replaceExercise = async (_id, name, sets, reps, weight, unit, date) => {
    const result = await Exercise.replaceOne({_id: _id}, {name: name, sets: sets, reps: reps, weight: weight, unit: unit, date: date});
    return result.modifiedCount;
}

//Delete an exercise by ID
const deleteById = async (_id) => {
    const result = await Exercise.deleteOne({_id: _id});
    return result.deletedCount;
}


export {createExercise, findExercise, findExerciseById, replaceExercise, deleteById}